import { buildSchema } from 'type-graphql';
import { ListingResolver } from '../resolvers/listing/listing';
import { HelloResolver } from '../resolvers/hello';
import { UserResolver } from '../resolvers/user/user';

export const createSchema = async () => await buildSchema({
  resolvers: [HelloResolver, UserResolver, ListingResolver],
  validate: false,
});
