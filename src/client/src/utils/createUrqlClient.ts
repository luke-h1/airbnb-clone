/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
// @ts-nocheck
import { cacheExchange, Resolver, Cache } from '@urql/exchange-graphcache';
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';

import {
  dedupExchange,
  Exchange,
  fetchExchange,
  stringifyVariables,
} from 'urql';
import { pipe, tap } from 'wonka';
import Router from 'next/router';
import { SSRExchange } from 'next-urql';
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  RegisterMutation,
  MeQuery,
  DeletePropertyMutationVariables,
} from '../generated/graphql';
import { CustomUpdateQuery } from './CustomUpdateQuery';
import { isServer } from '../utils/isServer';

const errorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes('Not Authenticated')) {
        Router.replace('/login');
      }
    }),
  );
};

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }
    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const inTheCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      'properties',
    );
    info.partial = !inTheCache;
    let hasMore = true;
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, 'properties') as string[];
      const _hasMore = cache.resolve(key, 'hasMore');
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });
    return {
      __typename: 'PaginatedProperties',
      hasMore,
      properties: results,
    };
  };
};

function invalidateAllProperties(cache: Cache) {
  const allFields = cache.inspectFields('Query');
  const fieldInfos = allFields.filter(
    (info) => info.fieldName === 'properties',
  );
  fieldInfos.forEach((fi) => {
    cache.invalidate('Query', 'properties', fi.arguments || {});
  });
}

export const createUrqlClient = (ssrExchange: SSRExchange, ctx: any) => {
  let cookie = '';
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
  }
  return {
    url: process.env.NEXT_PUBLIC_API_URL as string,
    fetchOptions: {
      credentials: 'include' as const,
      headers: cookie ? { cookie } : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedProperties: () => null,
        },
        resolvers: {
          Query: {
            properties: cursorPagination(),
          },
        },
        updates: {
          Mutation: {
            deleteProperty: (_result, args, cache) => {
              cache.invalidate({
                __typename: 'Property',
                id: (args as DeletePropertyMutationVariables).id,
              });
            },
            createProperty: (_result, args, cache) => {
              invalidateAllProperties(cache);
            },
            updateProperty: (_result, args, cache) => {
              cache.invalidate({
                __typename: 'Property',
                id: (args as DeletePropertyMutationVariables).id,
              });
            },
            login: (_result, args, cache) => {
              CustomUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.login.errors) {
                    return query;
                  }
                  return {
                    me: result.login.user,
                  };
                },
              );
              invalidateAllProperties(cache);
            },
            register: (_result, args, cache) => {
              CustomUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.register.errors) {
                    return query;
                  }
                  return {
                    me: result.register.user,
                  };
                },
              );
            },
            logout: (_result, args, cache) => {
              CustomUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null }),
              );
            },
          },
        },
      }),
      /*
      ORDER IS EXTREMELY IMPORTANT HERE!
      DO NOT TOUCH THIS CODE!!!
      */
      multipartFetchExchange,
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  };
};
