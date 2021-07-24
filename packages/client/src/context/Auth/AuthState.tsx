import { API_URL } from '@src/utils/url';
import axios from 'axios';
import React, { useReducer } from 'react';
import { AuthContext } from '../AuthContext';
import { loginOpts, registerOpts } from '../types/user';

import authReducer from './authReducer';
import {
  LOGIN, LOGOUT, ME, REGISTER,
} from './types';

const AuthState = ({ children }: { children: React.ReactNode }) => {
  const initialState = {
    user: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (options: loginOpts) => {
    const res = await axios({
      method: 'POST',
      url: `${API_URL}/api/users/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: options,
      withCredentials: true,
    });
    dispatch({
      type: LOGIN,
      payload: res.data,
    });
  };

  const logout = async () => {
    await axios({
      method: 'GET',
      url: `${API_URL}/api/users/logout`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    dispatch({
      type: LOGOUT,
      payload: null,
    });
  };

  const me = async () => {
    const res = await axios({
      method: 'GET',
      url: `${API_URL}/api/users`,
      headers: {
        'Content-Type': 'application/json',
        // TODO get auth
      },
      withCredentials: true,
    });
    dispatch({
      type: ME,
      payload: res.data.user,
    });
  };

  const register = async (options: registerOpts) => {
    const res = await axios({
      method: 'POST',
      url: `${API_URL}/api/users/register`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: { options },
      withCredentials: true,
    });
    dispatch({
      type: REGISTER,
      payload: res.data.user,
    });
  };
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        // @ts-ignore
        loading: state.loading,
        // @ts-ignore
        login,
        me,
        logout,
        // @ts-ignore
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthState;
