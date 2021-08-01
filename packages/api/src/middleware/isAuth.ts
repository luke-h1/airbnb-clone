import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../utils/types';

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error('Not Authenticated!');
  }
  return next();
};
