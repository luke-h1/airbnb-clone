import { Field, InputType } from 'type-graphql';

@InputType()
export class ListingInput {
  @Field()
  name: string;

  @Field()
  category: string;

  @Field()
  picture: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  beds: number;

  @Field()
  guests: number;

  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Field(() => [String])
  amenities: string[]
}
