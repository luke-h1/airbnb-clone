// @ts-ignore
// @ts-nocheck
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
import { FindOptionsUtils, getConnection } from 'typeorm';
import { isAuth } from '../../middleware/isAuth';
import { MyContext } from '../../shared/types';
import { validateProperty } from '../../shared/validateProperty';
import { Property } from '../../entities/Property';
import { CreatePropertyInput } from './CreatePropertyInput';
import { User } from '../../entities/User';

@Resolver(Property)
export class PropertyResolver {
  @FieldResolver(() => User)
  propertyCreator(
    @Root() property: Property,
    @Ctx() { userLoader }: MyContext,
  ) {
    return userLoader.load(property.userId);
  }

  @Mutation(() => Property)
  @UseMiddleware(isAuth)
  async createProperty(
    @Arg('options') options: CreatePropertyInput,
    @Ctx() { req }: MyContext,
  ): Promise<Property> {
    let property;
    const errors = validateProperty(options);
    if (errors) {
      return { errors };
    }
    const userIdNum = parseInt(req.session.userId, 10);
    console.log(req.session.userId);
    return Property.create({
      ...options,
      userId: req.session.userId,
    }).save();
  }

  @Query(() => [Property])
  async properties(): Promise<Property[]> {
    const properties = await getConnection().query(
      `
        SELECT p.* from "properties" p 
        ORDER BY p."createdAt" DESC
      `,
    );
    return properties;
  }

  @Query(() => Property)
  async property(
    @Arg('id', () => Int) id: number,
  ): Promise<Property | undefined> {
    return Property.findOne(id);
  }
}
