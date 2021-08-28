import { buildSchemaSync } from 'type-graphql';
import { authChecker } from './auth';
import { ImageResolver } from './image';
import { ListingResolver } from './listings';

export const schema = buildSchemaSync({
  resolvers: [ListingResolver, ImageResolver],
  emitSchemaFile: process.env.NODE_ENV === 'development',
  authChecker,
});
