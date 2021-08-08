import { CART_CLEAR_ITEMS } from '@src/constants/cart';
import baseApi from '@src/utils/baseApi';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
} from '../constants/order';
import { logout } from './userActions';

export const createOrder = (order: any) => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await baseApi.post('/orders', order, {
      headers: `Bearer ${userInfo.token}`,
    });
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    });
    localStorage.removeItem('cartItems');
  } catch (e) {
    const message = e.response && e.response.data.message
      ? e.response.data.message
      : e.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    });
  }
};

export const getOrderDetails = (id: number) => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await baseApi.get(`/orders/${id}`, {
      headers: `Bearer ${userInfo.token}`,
    });
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
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
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const payOrder = (orderId: number, paymentResult: any) => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await baseApi.put(
      `/orders/${orderId}/pay`,
      paymentResult,
      { headers: `Bearer ${userInfo.token}` },
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
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
      type: ORDER_PAY_FAIL,
      payload: message,
    });
  }
};

export const listMyOrders = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await baseApi.get('/orders/myorders', {
      headers: `Bearer ${userInfo.token}`,
    });

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
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
      type: ORDER_LIST_MY_FAIL,
      payload: message,
    });
  }
};

export const listOrders = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await baseApi.get('/orders', {
      headers: `Bearer ${userInfo.token}`,
    });
    dispatch({
      type: ORDER_LIST_SUCCESS,
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
      type: ORDER_LIST_FAIL,
      payload: message,
    });
  }
};
