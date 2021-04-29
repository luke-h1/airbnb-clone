import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';
import { isServer } from 'src/hooks/isServer';
import { createWithApollo } from './createWithApollo';

const createClient = (ctx: NextPageContext) => new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL as string,
  credentials: 'include',
  headers: {
    cookie: (isServer() ? ctx?.req?.headers.cookie : undefined) as any,
  },
  cache: new InMemoryCache({
    typePolicies: {
      Query: {},
    },
  }),
});
export const withApollo = createWithApollo(createClient);
