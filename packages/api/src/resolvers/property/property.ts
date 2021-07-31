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
import { constants } from '../../shared/constants';
import { User } from '../../entities/User';
import { isAuth } from '../../middleware/isAuth';
import { MyContext } from '../../shared/types';
import { validateProperty } from '../../validation/property/validateProperty';
import { Property } from '../../entities/Property';
import { PropertyInput } from './inputs/PropertyInput';
import { Delete, Upload } from '../../utils/image/s3/s3utils';

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
    @Arg('image', () => GraphQLUpload)
      { createReadStream, filename }: FileUpload,
  ): Promise<PropertyResponse> {
    const errors = validateProperty(options);
    if (errors) {
      return { errors };
    }
    const { image, imageFileName } = await Upload(
      createReadStream,
      filename,
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
        image,
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

    // TODO: Change this SQL query before deploying

    const properties = await getConnection().query(
      `
        SELECT p.* from "properties" p
        WHERE (p."creatorId" = $1)
        ${cursor ? `AND WHERE p."createdAt" < $2` : ''}
        ORDER BY p."createdAt" DESC
        LIMIT $1
      `,
      [req.session.userId],
    );
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

  @Mutation(() => Property, { nullable: true })
  @UseMiddleware(isAuth)
  async updateProperty(
    @Arg('options') options: PropertyInput,
    @Arg('id', () => Int) id: number,
    @Arg('image', () => GraphQLUpload)
      { createReadStream, filename }: FileUpload,
    @Ctx() { req }: MyContext,
  ): Promise<Property | null> {
    const {
      title,
      propertyType,
      description,
      pricePerNight,
      beds,
      bedrooms,
      address,
      amenities,
    } = options;
    const { image, imageFileName } = await Upload(
      createReadStream,
      filename,
      constants.S3PropertyImageKey,
    );
    const result = await getConnection()
      .createQueryBuilder()
      .update(Property)
      .set({
        title,
        propertyType,
        description,
        pricePerNight,
        address,
        beds,
        bedrooms,
        image,
        imageFileName,
        amenities,
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
    await Delete(property!.imageFileName);
    await Property.delete({ id, creatorId: req.session.userId });
    return true;
  }
}
