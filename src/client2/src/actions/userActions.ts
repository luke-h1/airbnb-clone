/* eslint-disable no-underscore-dangle */
import { ORDER_LIST_MY_RESET } from '../constants/order';
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../constants/user';
import baseApi from '../utils/baseApi';

export const login = (email: string, password: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const { data } = await baseApi.post('/users/login', { email, password });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (e) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
    });
  }
};
export const logout = () => (dispatch: any) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('paymentMethod');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
  dispatch({ type: USER_LIST_RESET });
  document.location.href = '/login';
};

export const register = (name: string, email: string, password: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const { data } = await baseApi.post('/users', { name, email, password });
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (e) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
    });
  }
};

export const getUserDetails = (id: string) => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await baseApi.get(`/users/${id}`, {
      headers: `Bearer ${userInfo.token}`,
    });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    const message = e.response && e.response.data.message
      ? e.response.data.message
      : e.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const updateUserProfile = (user: any) => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await baseApi.put('/users/profile', user, {
      headers: `Bearer ${userInfo.token}`,
    });

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (e) {
    const message = e.response && e.response.data.message
      ? e.response.data.message
      : e.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message,
    });
  }
};

export const listUsers = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await baseApi.get('/users', {
      headers: `Bearer ${userInfo.token}`,
    });
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (e) {
    const message = e.response && e.response.data.message
      ? e.response.data.message
      : e.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: USER_LIST_FAIL,
      payload: message,
    });
  }
};

export const deleteUser = (id: string) => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    await baseApi.delete(`/users/${id}`, {
      headers: `Bearer ${userInfo.token}`,
    });
    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (e) {
    const message = e.response && e.response.data.message
      ? e.response.data.message
      : e.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateUser = (user: any) => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await baseApi.put(`/users/${user._id}`, user, {
      headers: `Bearer ${userInfo.token}`,
    });

    dispatch({ type: USER_UPDATE_SUCCESS });

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

    dispatch({ type: USER_DETAILS_RESET });
  } catch (e) {
    const message = e.response && e.response.data.message
      ? e.response.data.message
      : e.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message,
    });
  }
};
