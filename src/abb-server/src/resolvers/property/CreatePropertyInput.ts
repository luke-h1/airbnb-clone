import { Field, InputType } from 'type-graphql';
import { User } from '../../entities/User';

@InputType()
export class CreatePropertyInput {
  @Field()
  title: string;

  @Field(() => User)
  host: User;

  @Field()
  propertyType: string;

  @Field()
  mainImage: string;

  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Field()
  amenities: string[];
}
