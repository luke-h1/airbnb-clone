import { ApolloClient, InMemoryCache } from '@apollo/client';
import Config from 'react-native-config';
import { PaginatedProperties } from 'src/generated/graphql';

const client = new ApolloClient({
  uri: Config.PUBLIC_API_URL,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          properties: {
            keyArgs: [],
            merge(
              existing: PaginatedProperties | undefined,
              incoming: PaginatedProperties,
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
export default client;
