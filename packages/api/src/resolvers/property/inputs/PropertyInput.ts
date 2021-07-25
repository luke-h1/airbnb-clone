import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class PropertyInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  propertyType: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  pricePerNight: number;

  @Field(() => Int)
  beds: number;

  @Field(() => Int)
  bedrooms: number;

  @Field(() => String)
  address: string;

  @Field(() => [String])
  amenities: string[];
}
