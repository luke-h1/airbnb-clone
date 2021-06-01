import { buildSchema } from 'type-graphql';
import { HelloResolver } from '../resolvers/hello';
import { UserResolver } from '../resolvers/user/user';

export const createSchema = async () => await buildSchema({
  resolvers: [HelloResolver, UserResolver],
  validate: false,
});
