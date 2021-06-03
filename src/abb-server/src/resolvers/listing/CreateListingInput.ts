import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateListingInput {
  @Field()
  name: string;

  @Field()
  category: string;

  @Field()
  pictureUrl: string;

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
  amenities: string[];
}
