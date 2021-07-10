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
import { User } from '../../entities/User';
import { isAuth } from '../../middleware/isAuth';
import { MyContext } from '../../shared/types';
import { validateProperty } from '../../validation/property/validateProperty';
import { Property } from '../../entities/Property';
import { CreatePropertyInput } from './inputs/CreatePropertyInput';
import { UpdatePropertyInput } from './inputs/UpdatePropertyInput';

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
    @Arg('options') options: CreatePropertyInput,
    @Ctx() { req }: MyContext,
  ): Promise<PropertyResponse> {
    const errors = validateProperty(options);
    if (errors) {
      return { errors };
    }
    console.log(req.session.userId);
    const property = await Property.create({
      ...options,
      creatorId: req.session.userId,
    }).save();
    return {
      property,
    };
  }

  @Query(() => PaginatedProperties)
  async properties(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
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
        ${cursor ? `where p."createdAt" < $2` : ''} 
        ORDER BY p."createdAt" DESC
        LIMIT $1
      `,
      replacements,
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
    @Arg('options') options: UpdatePropertyInput,
    @Arg('id', () => Int) id: number,
    @Ctx() { req }: MyContext,
  ): Promise<Property | null> {
    const {
      title,
      propertyType,
      description,
      image,
      pricePerNight,
      address,
      amenities,
    } = options;
    const result = await getConnection()
      .createQueryBuilder()
      .update(Property)
      .set({
        title,
        propertyType,
        description,
        image,
        pricePerNight,
        address,
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
    await Property.delete({ id, creatorId: req.session.userId });
    return true;
  }
}
