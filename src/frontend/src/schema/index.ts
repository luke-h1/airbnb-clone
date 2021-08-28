import { buildSchemaSync, Query, Resolver } from 'type-graphql';
import { authChecker } from './auth';

@Resolver()
class DummyResolver {
  @Query(() => String)
  hello() {
    return 'hello';
  }
}

export const schema = buildSchemaSync({
  resolvers: [DummyResolver],
  emitSchemaFile: process.env.NODE_ENV === 'development',
  authChecker,
});
