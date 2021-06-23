import {
  Field, Float, InputType, Int,
} from 'type-graphql';

@InputType()
export class CreatePropertyInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  propertyType: string;

  @Field(() => String)
  mainImage: string;

  @Field(() => Int)
  pricePerNight: number;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field(() => [String])
  amenities: string[];
}
