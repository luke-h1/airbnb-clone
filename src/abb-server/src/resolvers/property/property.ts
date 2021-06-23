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
import { validateProperty } from '../../shared/validateProperty';
import { Property } from '../../entities/Property';
import { CreatePropertyInput } from './CreatePropertyInput';

@ObjectType()
class PropertyFieldError {
  @Field()
  field: string;

  @Field()
  message: string;
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
