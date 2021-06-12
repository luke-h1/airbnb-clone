import { buildSchema } from 'type-graphql';
import { PropertyResolver } from '../resolvers/property/property';
import { HelloResolver } from '../resolvers/hello';
import { UserResolver } from '../resolvers/user/user';

export const createSchema = async () => await buildSchema({
  resolvers: [HelloResolver, UserResolver, PropertyResolver],
  validate: false,
});
