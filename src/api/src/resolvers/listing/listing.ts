import {
  InputType,
  Field,
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
import { getConnection } from 'typeorm';
import { Context, AuthorizedContext } from '../../types/Context';
import { Listing } from '../../entities/Listing';

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

  @Field(() => String)
  propertyType!: string;

  @Field(() => Int)
  bedrooms!: number;
}

@Resolver()
export class ListingResolver {
  @Query(() => Listing, { nullable: true })
  async listing(@Arg('id') id: string, @Ctx() ctx: Context) {
    const result = await Listing.findOne({ where: { id: parseInt(id, 10) } });

    if (process.env.NODE_ENV === 'production') {
      if (ctx.uid !== result?.userId) return null;
    }
    return result;
  }

  @Query(() => [Listing], { nullable: false }) // [] if no listings
  async listings(@Arg('bounds') bounds: BoundsInput, @Ctx() ctx: Context) {
    const results = await ctx.prisma.listing.findMany({
      where: {
        latitude: { gte: bounds.sw.latitude, lte: bounds.ne.latitude },
        longitude: { gte: bounds.sw.longitude, lte: bounds.ne.longitude },
      },
      take: 50, // limit results to 50
    });
    // in production filter out listings created by other users
    if (process.env.NODE_ENV !== 'development') {
      const canAccess = results.filter((r) => r.userId === ctx.uid);
      return canAccess;
    }
    return results;
  }

  @Authorized()
  @Mutation(() => Listing, { nullable: true })
  async createListing(
    @Arg('input') input: ListingInput,
    @Ctx() ctx: AuthorizedContext,
  ) {
    const result = await Listing.create({
      userId: ctx.uid,
      image: input.image,
      address: input.address,
      propertyType: input.propertyType,
      latitude: input.coordinates.latitude,
      longitude: input.coordinates.longitude,
      bedrooms: input.bedrooms,
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
    const listing = await Listing.findOne({ where: { id: listingId } });

    if (!listing || listing.userId !== ctx.uid) return null;

    const result = await getConnection()
      .createQueryBuilder()
      .update(Listing)
      .set({
        image: input.image,
        address: input.address,
        propertyType: input.propertyType,
        latitude: input.coordinates.latitude,
        longitude: input.coordinates.longitude,
        bedrooms: input.bedrooms,
      })
      .where('id = :listingId and "userId" :creatorId', {
        id: listingId,
        userId: ctx.uid,
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
    const listing = await Listing.findOne({ where: { id: listingId } });

    if (!listing || listing.userId !== ctx.uid) return false;

    await Listing.delete({ id: listingId, userId: ctx.uid });

    return true;
  }
}
