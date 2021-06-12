import { Field, InputType } from 'type-graphql';
import { PropertyImages } from '../../entities/PropertyImages';
import { User } from '../../entities/User';

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

  @Field(() => [PropertyImages])
  images: PropertyImages[];

  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Field(() => [String])
  amenities: string[];

  @Field()
  user: User;
}
