import { processUpload } from '@src/utils/processUpload';
import {
  Arg, Field, Mutation, ObjectType, Resolver,
} from 'type-graphql';
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
    const pictureUrl = options.picture ? await processUpload(options.picture) : null;

    /* 
      @TODO: check for errors first, then create the listing in the DB and push to redis
    */
  }
}
