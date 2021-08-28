import { buildSchemaSync } from 'type-graphql';
import { authChecker } from './auth';
import { ListingResolver } from './listings';

export const schema = buildSchemaSync({
  resolvers: [ListingResolver],
  emitSchemaFile: process.env.NODE_ENV === 'development',
  authChecker,
});
