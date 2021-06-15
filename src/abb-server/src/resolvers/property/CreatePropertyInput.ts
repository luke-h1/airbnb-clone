import { Field, Float, InputType } from 'type-graphql';

@InputType()
export class CreatePropertyInput {
  @Field()
  title: string;

  @Field()
  propertyType: string;

  @Field()
  mainImage: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field(() => [String])
  amenities: string[];
}
