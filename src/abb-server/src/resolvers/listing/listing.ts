import {
  Arg, Field, Mutation, ObjectType, Resolver,
} from 'type-graphql';
import { Listing } from '../../entities/Listing';

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
    @Arg('name') name: string,
    @Arg('category') category: string,
    @Arg('pictureUrl') pictureUrl: string,
    @Arg('description') description: string,
    @Arg('price') price: number,
    @Arg('beds') beds: number,
    @Arg('guests') guests: number,
    @Arg('latitude') latitude: number,
    @Arg('longitude') longitude: number,
    @Arg('amenities') amenities: string[],
  ) {
    return true;
  }
}
