import { User } from '@src/types/User';
import { createContext } from 'react';
import { loginOpts, registerOpts } from '../types/user';

export const authContext = createContext(null);
export default authContext;
