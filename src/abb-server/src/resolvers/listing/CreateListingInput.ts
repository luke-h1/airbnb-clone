import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateListingInput {
  @Field()
  name: string;

  @Field()
  category: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  beds: number;

  @Field()
  guests: number;

  @Field()
  city: string;

  @Field()
  country: string;

  @Field()
  address: string;

  @Field(() => String)
  amenities: string;
}
