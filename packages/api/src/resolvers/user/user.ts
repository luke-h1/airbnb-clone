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
  UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import bcrypt from 'bcryptjs';
import { isAuth } from '../../middleware/isAuth';
import { User } from '../../entities/User';
import { MyContext } from '../../types/types';
import { UsernamePasswordInput } from './inputs/UsernamePasswordInput';
import { validateRegister } from '../../validation/user/validateRegister';
import { constants } from '../../utils/constants';
import { UserRegisterInput } from './inputs/UserRegisterInput';
import { Delete, Upload } from '../../utils/image/s3/s3utils';

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

@ObjectType()
class DeleteResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Boolean, { nullable: true })
  success?: boolean;
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
    if (newPassword.length <= 5) {
      return {
        errors: [
          {
            field: 'newPassword',
            message: 'length of new password must be greater than 5',
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
    const userIdNum = parseInt(userId, 10);
    const user = await User.findOne(userIdNum);

    if (!user) {
      return {
        errors: [
          {
            field: 'token',
            message: 'User no longer exists',
          },
        ],
      };
    }
    await User.update(
      { id: userIdNum },
      { password: await bcrypt.hash(newPassword, 10) },
    );
    // delete reset password key
    await redis.del(key);

    // login the user after they change their password
    req.session.userId = user.id;

    return {
      user,
    };
  }

  @FieldResolver(() => String)
  fullName(@Root() user: User) {
    if (user) {
      // eslint-disable-next-line prefer-template
      return user.firstName + ' ' + user.lastName;
    }
    return null;
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
    @Arg('image', () => GraphQLUpload, { nullable: true }) image: FileUpload,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    console.log(image);
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }
    const hashedPassword = await bcrypt.hash(options.password, 12);
    let user;

    try {
      const { image: s3Image, imageFileName } = await Upload(
        image.createReadStream,
        image.filename,
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
          image: s3Image,
          imageFileName,
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
    const valid = await bcrypt.compare(password, user.password);
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
        resolve(false);
        return;
      }
      resolve(true);
    }));
  }

  @Mutation(() => DeleteResponse)
  @UseMiddleware(isAuth)
  async deleteUser(
    @Ctx() { req, res }: MyContext,
    @Arg('id') id: number,
  ): Promise<DeleteResponse> {
    if (req.session.userId !== id) {
      return {
        success: false,
      };
    }
    const user = await User.findOne(id);
    if (!user) {
      return {
        success: false,
      };
    }
    await Delete(user.image);
    await User.delete(id);
    res.clearCookie(constants.COOKIE_NAME);
    return {
      success: true,
    };
  }
}
