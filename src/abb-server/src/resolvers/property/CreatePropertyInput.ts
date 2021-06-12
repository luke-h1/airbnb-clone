import { PropertyImages } from '@src/entities/PropertyImages';
import { User } from '@src/entities/User';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreatePropertyInput {
  @Field()
  title: string;

  @Field()
  host: User;

  @Field()
  propertyType: string;

  @Field()
  mainImage: string;

  @Field()
  images: PropertyImages[];

  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Field()
  amenities: string[];

  @Field()
  user: User;
}
