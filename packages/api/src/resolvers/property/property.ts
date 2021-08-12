/* eslint-disable quotes */
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { constants } from '../../utils/constants';
import { User } from '../../entities/User';
import { isAuth } from '../../middleware/isAuth';
import { MyContext } from '../../types/types';
import { validateProperty } from '../../validation/property/validateProperty';
import { Property } from '../../entities/Property';
import { PropertyInput } from './inputs/PropertyInput';
import { Delete, Upload } from '../../utils/image/s3/s3utils';
import { Like } from '../../entities/Like';

@ObjectType()
class PropertyFieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class PaginatedProperties {
  @Field(() => [Property])
  properties: Property[];

  @Field()
  hasMore: boolean;
}

@ObjectType()
class PropertyResponse {
  @Field(() => [PropertyFieldError], { nullable: true })
  errors?: PropertyFieldError[];

  @Field(() => Property, { nullable: true })
  property?: Property;
}

@Resolver(Property)
export class PropertyResolver {
  @FieldResolver(() => User)
  creator(@Root() property: Property, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(property.creatorId);
  }

  @Mutation(() => PropertyResponse)
  @UseMiddleware(isAuth)
  async createProperty(
    @Arg('options') options: PropertyInput,
    @Ctx() { req }: MyContext,
    @Arg('image', () => GraphQLUpload, { nullable: true }) image: FileUpload,
  ): Promise<PropertyResponse> {
    const errors = validateProperty(options);
    if (errors) {
      return { errors };
    }

    const { image: s3Image, imageFileName } = await Upload(
      image.createReadStream,
      image.filename,
      constants.S3PropertyImageKey,
    );

    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Property)
      .values({
        ...options,
        creatorId: req.session.userId,
        imageFileName,
        image: s3Image,
      })
      .returning('*')
      .execute();
    const property = result.raw[0];
    return {
      property,
    };
  }

  @Query(() => PaginatedProperties)
  async properties(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext,
  ): Promise<PaginatedProperties> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor, 10)));
    }

    const properties = await getConnection().query(
      `
        SELECT p.* from "properties" p
        WHERE (p."creatorId" = $1)
        ${cursor ? `AND WHERE p."createdAt" < $2` : ''}
        ORDER BY p."createdAt" DESC
      `,
      [req.session.userId],
    );
    // const qb = getConnection()
    //   .getRepository(Property)
    //   .createQueryBuilder("p")
    //   .innerJoinAndSelect("p.creator", "u", 'u.id = p."creatorId"')
    //   .orderBy('p."createdAt"', "DESC")
    //   .take(reaLimitPlusOne);

    // if (cursor) {
    //   qb.where('p."createdAt" < :cursor', {
    //     cursor: new Date(parseInt(cursor)),
    //   });
    // }

    // const properties = await qb.getMany();

    return {
      properties: properties.slice(0, realLimit),
      hasMore: properties.length === realLimitPlusOne,
    };
  }

  @Query(() => Property)
  async property(
    @Arg('id', () => Int) id: number,
  ): Promise<Property | undefined> {
    return Property.findOne(id);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async like(
    @Arg('propertyId', () => Int) propertyId: number,
    @Arg('value', () => Int) value: number,
    @Ctx() { req }: MyContext,
  ) {
    const isLike = value !== -1;
    const realValue = isLike ? 1 : -1;
    const { userId } = req.session;

    const like = await Like.findOne({ where: { propertyId, userId } });

    // the user has voted on the property before
    // and they are changing their vote
    if (like && like.value !== realValue) {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
            UPDATE like
            SET value = $1 
            WHERE "propertyId" = $2 and "userId" = $3
          `,
          [realValue, propertyId, userId],
        );
        await tm.query(
          `
            UPDATE property 
            SET points = points + $1
            WHERE id = $2
            `,
          [2 * realValue, propertyId],
        );
      });
    } else if (!like) {
      // has never liked the property before
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
        INSERT into like ("userId", "propertyId", valie)
        values($1, $2, $3)
        `,
          [userId, propertyId, realValue],
        );
        await tm.query(
          `
        UPDATE property 
        SET points = points + $1 
        WHERE id = $2
        `,
          [realValue, propertyId],
        );
      });
    }
    return true;
  }

  @Mutation(() => Property, { nullable: true })
  @UseMiddleware(isAuth)
  async updateProperty(
    @Arg('options') options: PropertyInput,
    @Arg('id', () => Int) id: number,
    @Arg('image', () => GraphQLUpload, { nullable: true }) image: FileUpload,
    @Ctx() { req }: MyContext,
  ): Promise<Property | null> {
    const { image: s3Image, imageFileName } = await Upload(
      image.createReadStream,
      image.filename,
      constants.S3PropertyImageKey,
    );
    const result = await getConnection()
      .createQueryBuilder()
      .update(Property)
      .set({
        ...options,
        image: s3Image,
        imageFileName,
      })
      .where('id = :id and creatorId = :creatorId', {
        id,
        creatorId: req.session.userId,
      })
      .returning('*')
      .execute();
    return result.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteProperty(
    @Arg('id', () => Int) id: number,
    @Ctx() { req }: MyContext,
  ): Promise<boolean> {
    const property = await Property.findOne(id);
    if (property) {
      await Delete(property.imageFileName);
      await Property.delete({ id, creatorId: req.session.userId });
      return true;
    }
    return false;
  }
}
