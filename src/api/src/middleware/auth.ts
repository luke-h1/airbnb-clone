import { AuthChecker } from 'type-graphql';
import { MyContext } from '../types/Context';

export const authChecker: AuthChecker<MyContext> = ({ context }) => {
  const { uid } = context;
  return !!uid;
};
