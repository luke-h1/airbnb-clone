import { processUpload } from '@src/utils/processUpload';
import { validateListing } from '@src/utils/validateListing';
import {
  Arg, Field, Mutation, ObjectType, Resolver,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Listing } from '../../entities/Listing';
import { ListingInput } from './ListingInput';

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}
@ObjectType()
class ListingResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Listing, { nullable: true })
  listing?: Listing;
}

@Resolver(Listing)
export class ListingResolver {
  @Mutation(() => ListingResponse)
  async createListing(
    @Arg('options') options: ListingInput,
    // @TODO: refactor below into it's own input type so we don't get duplicate pictureUrls
  ) {
    const errors = validateListing(options);
    if (errors) {
      return errors;
    }

    const pictureUrl = options.picture
      ? await processUpload(options.picture)
      : null;

    let listing;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Listing)
        .values({
          name: options.name,
          category: options.category,
          pictureUrl,
          description: options.description,
          price: options.price,
          beds: options.beds,
          guests: options.guests,
          latitude: options.latitude,
          longitude: options.longitude,
          amenities: options.amenities,
        });
    } catch (e) {
      console.error(e);
    }

    /*
      @TODO: check for errors first, then create the listing in the DB and push to redis
    */
  }
}
