/* eslint-disable */

import React, { useState, createContext } from 'react';
import { User } from '../types/User';
import userService from '../services/user';
import { loginOpts, registerOpts } from './types/user';

export const AuthContext = createContext<{
  user: User;
  login:({ options }: {options: loginOpts}) => void;
  logout: () => void;
  me: () => void;
  register: ({ options }: { options: registerOpts }) => void;
    }>({
      user: null,
      login: () => {},
      logout: () => {},
      me: () => {},
      register: () => {},
    });

interface AuthProviderProps {
    children: React.ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  const login = async ({ options }: { options: loginOpts }) => {
    const res = await userService.login({ options });
    console.log(res.data);
  };

  const logout = async () => {
    await userService.logout();
    setUser(null);
  };

  const me = async () => {
    const res = await userService.me();
    console.log(res.data);
  };

  const register = async ({ options }: { options: registerOpts }) => {
    console.log(options)
    const res = await userService.register(options);
    setUser(res.data.user)
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        me,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
