import { Field, InputType, Int } from 'type-graphql';
import { User } from '../../entities/User';

@InputType()
export class CreatePropertyInput {
  @Field(() => String)
  title: string;

  @Field(() => Int)
  host: User;

  @Field(() => String)
  propertyType: string;

  @Field(() => String)
  mainImage: string;

  @Field(() => Int)
  latitude: number;

  @Field(() => Int)
  longitude: number;

  @Field(() => [String])
  amenities: string[];
}
