import { Field, InputType, Int } from 'type-graphql';
import { CoordiantesInput } from './CoordinatesInput';

@InputType()
export class PropertyInput {
  @Field(() => String)
  address!: string;

  @Field(() => String)
  image!: string;

  @Field(() => CoordiantesInput)
  coordinates!: CoordiantesInput;

  @Field(() => String)
  propertyType!: string;

  @Field(() => Int)
  bedrooms!: number;
}
