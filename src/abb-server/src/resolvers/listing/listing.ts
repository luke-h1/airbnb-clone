import {
  Arg, Ctx, Field, Mutation, ObjectType, Resolver,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { MyContext } from '../../types';
import { listingCacheKey } from '../../constants';
import { validateListing } from '../../utils/validateListing';
import { redis } from '../../redis';
import { Listing } from '../../entities/Listing';
import { CreateListingInput } from './CreateListingInput';

// @TODO: Inherit this from user.
// extract out FieldError and make it inherit two classes
@ObjectType({ isAbstract: true })
class ListingFieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}
@ObjectType()
class ListingResponse {
  @Field(() => [ListingFieldError], { nullable: true })
  errors?: ListingFieldError[];

  @Field(() => Listing, { nullable: true })
  listing?: Listing;
}

@Resolver(Listing)
export class ListingResolver {
  @Mutation(() => ListingResponse)
  async createListing(
    @Arg('options') options: CreateListingInput,
    @Ctx() { req }: MyContext,
  ): Promise<ListingResponse> {
    const errors = validateListing(options);
    if (errors) {
      return { errors };
    }
    let listing;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Listing)
        .values({
          name: options.name,
          category: options.category,
          pictureUrl: options.pictureUrl,
          description: options.description,
          price: options.price,
          beds: options.beds,
          guests: options.guests,
          latitude: options.latitude,
          longitude: options.longitude,
          amenities: options.amenities,
          userId: req.session.userId,
        })
        .returning('*')
        .execute();
      listing = result.raw[0];
      console.log('listing', listing);
    } catch (e) {
      console.error(e);
    }
    redis.lpush(listingCacheKey, JSON.stringify(listing));
    return {
      listing,
    };
  }
}
