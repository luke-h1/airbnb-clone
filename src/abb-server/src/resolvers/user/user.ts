/* eslint-disable no-shadow */
import { v4 } from 'uuid';
import argon2 from 'argon2';
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { redis } from '../../redis';
import { sendConfirmationEmail } from '../../utils/mail/sendConfirmationEmail';
import { sendEmail } from '../../utils/mail/sendEmail';
import { User } from '../../entities/User';
import { MyContext } from '../../types';

import { UsernamePasswordInput } from './UsernamePasswordInput';
import { validateRegister } from '../../utils/validateRegister';
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from '../../constants';
import { sendPasswordResetMail } from '../../utils/mail/sendPasswordResetMail';

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    // this is the current logged in user so can show them their own email
    if (req.session.userId === user.id) {
      return user.email;
    }
    return '';
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { redis, req }: MyContext,
  ): Promise<UserResponse> {
    if (newPassword.length <= 2) {
      return {
        errors: [
          {
            field: 'newPassword',
            message: 'length must be greater than 2',
          },
        ],
      };
    }
    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);
    if (!userId) {
      return {
        errors: [
          {
            field: 'token',
            message: 'token expired',
          },
        ],
      };
    }
    // eslint-disable-next-line radix
    const userIdNum = parseInt(userId);
    const user = await User.findOne(userIdNum);
    if (!user) {
      return {
        errors: [
          {
            field: 'token',
            message: 'user no longer exists',
          },
        ],
      };
    }
    await User.update(
      { id: userIdNum },
      {
        password: await argon2.hash(newPassword),
      },
    );
    await redis.del(key);
    // login user after they've changed their password
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email') email: string,
    @Ctx() { redis }: MyContext,
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return true;
    }
    const token = v4();

    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      'ex',
      1000 * 60 * 60 * 24 * 2, // 2 days to reset their password
    );
    await sendPasswordResetMail(
      email,
      `<a href="http://localhost:3000/change-password/${token}" target='_blank'>Reset Password</a>`,
    );
    return true;
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    // not logged in
    if (!req.session.userId) {
      return null;
    }
    return User.findOne(req.session.userId);
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    const { email, password } = options;
    console.log(email, password);
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }
    const hashedPassword = await argon2.hash(options.password);
    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          email: options.email,
          password: hashedPassword,
        })
        .returning('*')
        .execute();
      user = result.raw[0];
      console.log(user);

      // send confirmation email
      // don't let user log in until they have confirmed
    } catch (e) {
      if (e.code === '23505') {
        return {
          errors: [
            {
              field: 'email',
              message: 'email already taken',
            },
          ],
        };
      }
    }

    // store user id session
    // this will set a cookie on the user
    // keep them logged in

    /*
      prompt user to confirm email on login
      if not confirmed in x amount of days drop them from the DB
    */

    req.session.userId = user.id;
    await sendEmail(
      options.email,
      await sendConfirmationEmail(user.id, 'http://localhost:3000'),
    );
    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  async confirmUser(
    @Arg('token') token: string,
  ): // @Ctx() ctx: MyContext,
  Promise<boolean> {
    const userId = await redis.get(token);
    // need to send something back to frontend here
    // i.e. Your token has expired, request a new one from ...
    if (!userId) {
      console.log('confirmUser: BAD TOKEN / EXPIRED TOKEN');
      return false;
    }

    await User.update({ id: parseInt(userId, 10) }, { confirmed: true });

    await redis.del(token);
    return true;
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    const { email, password } = options;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return {
        errors: [
          {
            field: 'email',
            message: "That email doesn't exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Incorrect credentials',
          },
        ],
      };
    }
    if (!user.confirmed) {
      return {
        errors: [
          {
            field: 'email',
            message: 'You need to confirm your email in order to log in',
          },
        ],
      };
    }

    req.session.userId = user.id;
    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) => req.session.destroy((e: any) => {
      res.clearCookie(COOKIE_NAME);
      if (e) {
        console.log('LOGOUT ERROR', e);
        resolve(false);
        return;
      }
      resolve(true);
    }));
  }
}
