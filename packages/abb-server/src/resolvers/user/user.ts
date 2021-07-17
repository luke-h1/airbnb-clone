/* eslint-disable no-shadow */
import { v4 } from 'uuid';
import argon2 from 'argon2';

// @TODO LUKE: create new upload image resolver for users
// run two mutations and create new DB column userImages
// associate user id to image so we know which one to fetch
// images inserted as empty string at the mo and to avoid orphaned s3 image
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
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Upload } from '../../utils/image/upload';
import { User } from '../../entities/User';
import { MyContext } from '../../shared/types';
import { UsernamePasswordInput } from './inputs/UsernamePasswordInput';
import { validateRegister } from '../../validation/user/validateRegister';
import { constants } from '../../shared/constants';
import { sendPasswordResetMail } from '../../utils/mail/sendPasswordResetMail';
import { UserRegisterInput } from './inputs/UserRegisterInput';

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

  @FieldResolver(() => String)
  fullName(@Root() user: User) {
    if (user) {
      // eslint-disable-next-line prefer-template
      return user.firstName + '' + user.lastName;
    }
    return null;
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
    const key = constants.FORGET_PASSWORD_PREFIX + token;
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
      constants.FORGET_PASSWORD_PREFIX + token,
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
    @Arg('options') options: UserRegisterInput,
    @Arg('image', () => GraphQLUpload)
      { createReadStream, filename }: FileUpload,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }
    const hashedPassword = await argon2.hash(options.password);
    let user;
    try {
      const image = await Upload(
        createReadStream,
        filename,
        constants.S3UserImageKey,
      );
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          firstName: options.firstName,
          lastName: options.lastName,
          email: options.email,
          password: hashedPassword,
          image: image.Location,
        })
        .returning('*')
        .execute();
      user = result.raw[0];
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
    req.session.userId = user.id;
    return {
      user,
    };
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

    req.session.userId = user.id;
    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) => req.session.destroy((e: any) => {
      res.clearCookie(constants.COOKIE_NAME);
      if (e) {
        console.log('LOGOUT ERROR', e);
        resolve(false);
        return;
      }
      resolve(true);
    }));
  }
}
