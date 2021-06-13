// @ts-ignore
// @ts-nocheck
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { isAuth } from '../../middleware/isAuth';
import { MyContext } from '../../shared/types';
import { validateProperty } from '../../shared/validateProperty';
import { Property } from '../../entities/Property';
import { CreatePropertyInput } from './CreatePropertyInput';

@ObjectType({ isAbstract: true })
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
  Property?: Property;
}

@Resolver(Property)
export class PropertyResolver {
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
    const prop = await Property.create({
      ...options,
      host: req.session.userId,
    }).save();
    return {
      prop,
    };
  }
}
