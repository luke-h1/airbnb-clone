import { buildSchema } from 'type-graphql';
import { PropertyResolver } from '../resolvers/property/property';
import { UserResolver } from '../resolvers/user/user';

export const createSchema = async () => await buildSchema({
  resolvers: [UserResolver, PropertyResolver],
  validate: false,
});
