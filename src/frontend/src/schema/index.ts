import { buildSchemaSync } from 'type-graphql';
import { ImageResolver } from './image';
import { authChecker } from './auth';
import { ListingResolver } from './listing';

export const schema = buildSchemaSync({
  resolvers: [ImageResolver, ListingResolver],
  emitSchemaFile: process.env.NODE_ENV === 'development',
  authChecker,
});
