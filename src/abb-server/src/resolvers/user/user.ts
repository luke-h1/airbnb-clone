/* eslint-disable no-shadow */
import argon2 from 'argon2';
import { validUserSchema, changePasswordSchema } from 'abb-common';
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { v4 } from 'uuid';

import { redis } from '../../redis';
import { createConfirmEmailLink } from '../../utils/createConfirmEmailLink';
import { removeAllUserSessions } from '../../utils/removeAllUserSessions';
import { MyContext } from '../../types';
import { createForgotPasswordLink } from '../../utils/createForgotPasswordLink';
import { formatYupError } from '../../utils/formatYupError';
import { sendEmail } from '../../utils/sendEmail';
import { User } from '../../entities/User';
import { FORGET_PASSWORD_PREFIX, userSessionIdPrefix } from '../../constants';
import {
  confirmEmailError,
  duplicateEmail,
  expiredKeyError,
  forgotPasswordLockedError,
  invalidLogin,
} from './errorMessages';
import { UsernamePasswordInput } from './UsernamePasswordInput';

const errorResponse = [
  {
    path: 'email',
    message: invalidLogin,
  },
];

@ObjectType()
class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @Mutation(() => Boolean)
  async sendForgotPasswordEmail(
    @Arg('email') email: string,
    @Ctx() { redis }: MyContext,
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // email is not in DB
      return true;
      // return [
      //   {
      //     path: "email",
      //     message: userNotFoundError
      //   }
      // ];
    }
    // await forgotPasswordLockAccount(user.id, redis);
    const token = v4();
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      'ex',
      1000 * 60 * 60 * 24 * 3,
    );
    // user has 3 days to reset their password
    const url = await createForgotPasswordLink(
      process.env.FRONTEND_HOST,
      user.id,
      redis,
    );
    await sendEmail(email, url, 'reset password');
    return true;
  }

  @Mutation(() => Boolean)
  async forgotPasswordChange(
    @Arg('key') key: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { redis, req }: MyContext,
  ) {
    const redisKey = `${FORGET_PASSWORD_PREFIX}${key}`;
    const userId = await redis.get(redisKey);
    if (!userId) {
      return [
        {
          path: 'newPassword',
          message: expiredKeyError,
        },
      ];
    }
    try {
      await changePasswordSchema.validate(
        { newPassword },
        { abortEarly: false },
      );
    } catch (e) {
      return formatYupError(e);
    }
    const hashedPassword = await argon2.hash(newPassword);

    const updatePromise = User.update(
      { id: userId },
      {
        forgotPasswordLocked: false,
        password: hashedPassword,
      },
    );
    const deleteKeyPromise = redis.del(key);
    await Promise.all([updatePromise, deleteKeyPromise]);
    return null;
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { req, redis }: MyContext,
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return { errors: errorResponse };
    }
    if (!user.confirmed) {
      return {
        errors: [
          {
            path: 'email',
            message: confirmEmailError,
          },
        ],
      };
    }
    if (user.forgotPasswordLocked) {
      return {
        errors: [
          {
            path: 'email',
            message: forgotPasswordLockedError,
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return { errors: errorResponse };
    }
    // login is succesful
    // give them a cookie 🍪
    req.session.userId = user.id;
    if (req.sessionID) {
      await redis.lpush(`${userSessionIdPrefix}${user.id}`, req.sessionID);
    }
    return { sessionId: req.sessionID };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res, redis }: MyContext) {
    return new Promise((resolve) => {
      const { userId } = req.session;
      if (userId) {
        removeAllUserSessions(userId, redis);
        req.session.destroy((err: any) => {
          res.clearCookie('qid');
          if (err) {
            console.log(err);
            resolve(false);
            return;
          }
          resolve(true);
        });
      }
    });
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    // user isn't logged in
    if (!req.session.userId) {
      return null;
    }
    return User.findOne({ where: { id: req.session.userId } });
  }

  @Mutation(() => User)
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { url }: MyContext,
  ) {
    try {
      await validUserSchema.validate(options, { abortEarly: true });
    } catch (e) {
      return formatYupError(e);
    }
    const { email, password } = options;

    const userAlreadyExists = await User.findOne({
      where: { email },
      select: ['id'],
    });
    if (userAlreadyExists) {
      return [
        {
          path: 'email',
          message: duplicateEmail,
        },
      ];
    }
    const user = await User.create({
      email,
      password,
    });

    await user.save();

    if (process.env.NODE_ENV !== 'test') {
      await sendEmail(
        email,
        await createConfirmEmailLink(url, user.id, redis),
        'confirm email',
      );
    }
    return null;
  }
}
