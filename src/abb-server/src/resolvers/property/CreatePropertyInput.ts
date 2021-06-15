import { Field, Float, InputType } from 'type-graphql';

@InputType()
export class CreatePropertyInput {
  @Field()
  title: string;

  @Field(() => String)
  propertyType: string;

  @Field(() => String)
  mainImage: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field(() => [String])
  amenities: string[];
}
