import { cacheExchange } from '@urql/exchange-graphcache';
import { dedupExchange, Exchange, fetchExchange } from 'urql';
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
          //   PaginatedTodos: () => null,
        },
        resolvers: {
          Query: {
            // todos: cursorPagination(),
          },
        },
        updates: {
          Mutation: {
            // deleteTodo: (_result, args, cache) => {
            //   cache.invalidate({
            //     __typename: 'Todo',
            //     id: (args as DeleteTodoMutationVariables).id,
            //   });
            // },
            // createTodo: (_result, args, cache) => {
            //   invalidateAllTodos(cache);
            // },
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
