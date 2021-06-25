/* eslint-disable no-underscore-dangle */
import { Cache, cacheExchange, Resolver } from '@urql/exchange-graphcache';
import {
  dedupExchange, Exchange, fetchExchange, stringifyVariables,
} from 'urql';
import { pipe, tap } from 'wonka';
import Router from 'next/router';
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  RegisterMutation,
  MeQuery,
} from '../generated/graphql';
import { CustomUpdateQuery } from './CustomUpdateQuery';
import { isServer } from './isServer';

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

function invalidateAllProperties(cache: Cache) {
  const allFields = cache.inspectFields('Query');
  const fieldInfos = allFields.filter(
    (info) => info.fieldName === 'properties',
  );
  fieldInfos.forEach((fi) => {
    cache.invalidate('Query', 'properties', fi.arguments || {});
  });
}

const cursorPagination = ():Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    // eslint-disable-next-line no-shadow
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }
    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      'properties',
    );
    // eslint-disable-next-line no-param-reassign
    info.partial = !isItInTheCache;
    let hasMore = true;
    const results:string[] = [];
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

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
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
            },
            createProperty: (_result, args, cache) => {
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
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  };
};
