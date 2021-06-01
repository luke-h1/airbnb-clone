import { graphql } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { createSchema } from '@src/utils/createSchema';

interface Options {
    source: string;
    variableValues?: Maybe<{
        [key: string]: any;
    }>;
}

export const gCall = async ({ source, variableValues }: Options) => graphql({
  schema: await createSchema(),
  source,
  variableValues,
});
