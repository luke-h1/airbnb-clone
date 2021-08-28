import { Min, Max } from 'class-validator';
import { getBoundsOfDistance } from 'geolib';
import {
  Ctx,
  Field,
  Float,
  ID,
  InputType,
  Int,
  ObjectType,
} from 'type-graphql';
import { Context, AuthorizedContext } from './context';

@InputType()
class CoordinatesInput {
  @Min(-90)
  @Max(90)
  @Field(() => Float)
  latitude!: number;

  @Min(-180)
  @Max(180)
  @Field(() => Float)
  longitude!: number;
}

@InputType()
class BoundsInput {
  @Field(() => CoordinatesInput)
  sw!: CoordinatesInput; // south west

  @Field(() => CoordinatesInput)
  ne!: CoordinatesInput; // north east
}

@InputType()
class ListingInput {
  @Field(() => String)
  address!: string;

  @Field(() => String)
  image!: string;

  @Field(() => CoordinatesInput)
  coordinates!: CoordinatesInput;

  @Field(() => Int)
  bedrooms!: number;
}

@ObjectType()
class Listing {
  @Field(() => ID)
  id!: number;

  @Field(() => String)
  userId!: string;

  @Field(() => Float)
  latitude!: number;

  @Field(() => Float)
  longitude!: number;

  @Field(() => String)
  address!: string;

  @Field(() => String)
  image!: string;

  @Field(() => String)
  publicId(): String {
    const parts = this.image.split('/');
    return parts[parts.length - 1];
  }

  @Field(() => Int)
  bedrooms!: number;

  @Field(() => [Listing])
  async nearby(@Ctx() ctx: Context) {
    const bounds = getBoundsOfDistance(
      { latitude: this.latitude, longitude: this.longitude },
      1000, // 10km
    );
    /*
    bounds array shape:
     [
      {latitude: 10, longitude: 20},
      {latitude: 10, longitude: 20}
     ]
    */
    return ctx.prisma.listing.findMany({
      where: {
        latitude: { gte: bounds[0].latitude, lte: bounds[1].latitude },
        longitude: { gte: bounds[0].longitude, lte: bounds[1].longitude },
        id: { not: { equals: this.id } },
      },
      take: 25,
    });
  }
}
