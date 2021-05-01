import { Field, InputType } from 'type-graphql';

@InputType()
export class ListingInput {
  @Field()
  picture: string;

  @Field()
  category: String;

  @Field()
  description: String;

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

  @Field()
  amenities: [String];
}
