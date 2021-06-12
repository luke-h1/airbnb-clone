import {
  Arg, Ctx, Field, Mutation, ObjectType, Resolver,
} from 'type-graphql';
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
  async createProperty(
    @Arg('options') options: CreatePropertyInput,
    @Ctx() { req }: MyContext,
  ): Promise<PropertyResponse> {
    const errors = validateProperty(options);
    if (errors) {
      return { errors };
    }
    let prop;
    return {};
  }
}
