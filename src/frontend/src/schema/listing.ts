import {
  ObjectType,
  InputType,
  Field,
  ID,
  Float,
  Int,
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  Authorized,
} from 'type-graphql';
import { Min, Max } from 'class-validator';
import { getBoundsOfDistance } from 'geolib';
import { Context, AuthorizedContext } from './context';

@InputType()
class CoordiantesInput {
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
  @Field(() => CoordiantesInput)
  sw!: CoordiantesInput; // south west

  @Field(() => CoordiantesInput)
  ne!: CoordiantesInput; // north east
}

@InputType()
class ListingInput {
  @Field(() => String)
  address!: string;

  @Field(() => String)
  image!: string;

  @Field(() => CoordiantesInput)
  coordinates!: CoordiantesInput;

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
      10000, // 10km
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
      take: 25, // return 25
    });
  }
}

@Resolver()
export class ListingResolver {
  @Query(() => Listing, { nullable: true })
  async listing(@Arg('id') id: string, @Ctx() ctx: Context) {
    const result = await ctx.prisma.listing.findOne({
      where: { id: parseInt(id, 10) },
    });
    return result;
  }

  @Query(() => [Listing], { nullable: false }) // [] if no listings
  async listings(@Arg('bounds') bounds: BoundsInput, @Ctx() ctx: Context) {
    const result = ctx.prisma.listing.findMany({
      where: {
        latitude: { gte: bounds.sw.latitude, lte: bounds.ne.latitude },
        longitude: { gte: bounds.sw.longitude, lte: bounds.ne.longitude },
      },
      take: 50, // limit results to 50
    });
    return result;
  }

  @Authorized()
  @Mutation(() => Listing, { nullable: true })
  async createListing(
    @Arg('input') input: ListingInput,
    @Ctx() ctx: AuthorizedContext,
  ) {
    const result = await ctx.prisma.listing.create({
      data: {
        userId: ctx.uid,
        image: input.image,
        address: input.address,
        latitude: input.coordinates.latitude,
        longitude: input.coordinates.longitude,
        bedrooms: input.bedrooms,
      },
    });
    return result;
  }

  @Authorized()
  @Mutation(() => Listing, { nullable: true })
  async updateListing(
    @Arg('id') id: string,
    @Arg('input') input: ListingInput,
    @Ctx() ctx: AuthorizedContext,
  ) {
    const listingId = parseInt(id, 10);
    const listing = await ctx.prisma.listing.findOne({
      where: { id: listingId },
    });

    if (!listing || listing.userId !== ctx.uid) return null;

    const result = await ctx.prisma.listing.update({
      where: { id: listingId },
      data: {
        image: input.image,
        address: input.address,
        latitude: input.coordinates.latitude,
        longitude: input.coordinates.longitude,
        bedrooms: input.bedrooms,
      },
    });
    return result;
  }

  @Authorized()
  @Mutation(() => Boolean, { nullable: false })
  async deleteListing(
    @Arg('id') id: string,
    @Ctx() ctx: AuthorizedContext,
  ): Promise<boolean> {
    const listingId = parseInt(id, 10);
    const listing = await ctx.prisma.listing.findOne({
      where: { id: listingId },
    });

    if (!listing || listing.userId !== ctx.uid) return false;

    await ctx.prisma.listing.delete({ where: { id: listingId } });
    return true;
  }
}
