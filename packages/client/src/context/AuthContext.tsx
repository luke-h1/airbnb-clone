import { User } from '@src/types/User';
import React, { useState, createContext } from 'react';
import axios from 'axios';
import { API_URL } from '@src/utils/url';
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
  return (
    <AuthContext.Provider
      value={{
        user,
        login: async ({ options }) => {
          const res = await axios({
            method: 'POST',
            url: `${API_URL}/api/users/login`,
            headers: {
              'Content-Type': 'application/json',
            },
            data: options,
          });
          console.log(res.data);
        },

        logout: async () => {
          const res = await axios({
            method: 'GET',
            url: `${API_URL}/api/users/logout`,
            headers: {
              'Content-Type': 'application/json',
            },
          });
          setUser(null);
        },
        me: async () => {
          const res = await axios({
            method: 'GET',
            url: `${API_URL}/api/users`,
            headers: {
              'Content-Type': 'application/json',
              // TODO get auth
            },
          });
          console.log(res.data);
        },
        register: async ({ options }) => {
          const res = await axios({
            method: 'POST',
            url: `${API_URL}/api/users/register`,
            headers: {
              'Content-Type': 'application/json',
            },
            data: options,
          });
          console.log(res.data);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
