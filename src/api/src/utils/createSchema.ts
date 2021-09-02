import { buildSchema } from 'type-graphql';
import { ListingResolver } from '../resolvers/listing/listing';

export const createSchema = async () => await buildSchema({
  resolvers: [ListingResolver],
  validate: false,
});
