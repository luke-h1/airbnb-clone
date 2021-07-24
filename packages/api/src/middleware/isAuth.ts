import { MyContext } from '../types/context';

// @ts-ignore
export const isAuth = ({ context }: { context: MyContext }, next) => {
  if (!context.req.session.userId) {
    throw new Error('Not Authenticated!');
  }
  return next();
};
