import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';
import { IncomingMessage } from 'connect';
import { useMemo } from 'react';
import { Listing } from 'src/generated/graphql';

function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({ uri: '/api/graphql', credentials: 'same-origin' }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            listings: {
              keyArgs: [],
              // merge(existing: Listing | undefined, incoming: Listing): Listing {
              //   return {
              //     ...incoming,
              //     listings: [...(existing?.listings || []), ...incoming.listings],
              //   };
              // },
            },
          },
        },
      },
    }),
  });
}
export function useApollo() {
  const client = useMemo(() => createApolloClient(), []);
  return client;
}
