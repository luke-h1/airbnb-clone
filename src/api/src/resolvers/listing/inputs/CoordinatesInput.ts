import { Min, Max } from 'class-validator';
import { InputType, Field, Float } from 'type-graphql';

@InputType()
export class CoordiantesInput {
  @Min(-90)
  @Max(90)
  @Field(() => Float)
  latitude!: number;

  @Min(-180)
  @Max(180)
  @Field(() => Float)
  longitude!: number;
}
