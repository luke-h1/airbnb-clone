import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class CreatePropertyInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  propertyType: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  pricePerNight: number;

  @Field(() => String)
  address: string;

  @Field(() => [String])
  amenities: string[];
}
