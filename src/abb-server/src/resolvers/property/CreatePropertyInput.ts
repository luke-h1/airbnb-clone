import { Field, InputType } from 'type-graphql';

@InputType()
export class CreatePropertyInput {
  @Field()
  title: string;

  @Field()
  propertyType: string;

  @Field()
  mainImage: string;

  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Field(() => [String])
  amenities: string[];
}
