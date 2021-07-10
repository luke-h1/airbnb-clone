import { ApolloClient, InMemoryCache } from '@apollo/client';
import { PaginatedProperties } from '@src/generated/graphql';
import { NextPageContext } from 'next';
import { withApollo } from 'next-apollo';
// isomorphic fetch for passing the cookies along with each GraphQL request

const client = (ctx: NextPageContext) => {
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    credentials: 'include',
    ssrMode: false,
    headers: {
      cookie: ctx.req?.headers.cookie as string,
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            properties: {
              keyArgs: [],
              merge(
                existing: PaginatedProperties | undefined,
                incoming: PaginatedProperties
              ): PaginatedProperties {
                return {
                  ...incoming,
                  properties: [
                    ...(existing?.properties || []),
                    ...incoming.properties,
                  ],
                };
              },
            },
          },
        },
      },
    }),
  });
};
export default withApollo(client);
