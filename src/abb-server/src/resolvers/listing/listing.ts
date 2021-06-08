import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { MyContext } from '../../shared/types';
import { validateListing } from '../../shared/validateListing';
import { Listing } from '../../entities/Listing';
import { CreateListingInput } from './CreateListingInput';
import { isAuth } from '../../middleware/isAuth';

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
  @UseMiddleware(isAuth)
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
          ...options,
          creator: req.session.userId,
        })
        .returning('*')
        .execute();
      listing = result.raw[0];
      console.log(listing);
    } catch (e) {
      console.error(e);
    }
    return {
      listing,
    };
  }
}
