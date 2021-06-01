import { graphql } from 'graphql';
import { createSchema } from 'src/utils/createSchema';

export const gCall = async () => graphql({
  schema: await createSchema(),
});
