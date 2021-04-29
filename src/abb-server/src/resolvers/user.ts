import { expiredKeyError, FORGET_PASSWORD_PREFIX } from 'src/constants';
import { User } from 'src/entities/User';
import { MyContext } from 'src/types';
import { createForgotPasswordLink } from 'src/utils/createForgotPasswordLink';
import { sendEmail } from 'src/utils/sendEmail';
import {
  Arg, Ctx, Mutation, Resolver,
} from 'type-graphql';
import { v4 } from 'uuid';
import { changePasswordSchema } from '../../../abb-common/index';
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
      console.error(e);
    }
    return {};
  }
}
