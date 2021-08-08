/* eslint-disable no-underscore-dangle */
import baseApi from '../utils/baseApi';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cart';

export const addToCart = (id: number) => async (dispatch: any, getState: any) => {
  const { data } = await baseApi.get(`/properties/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      property: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      beds: data.beds,
      bedrooms: data.bedrooms,
    },
  });
  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().cart.cartItems),
  );
};

export const removeFromCart = (id: number) => (dispatch: any, getState: any) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().cart.cartItems),
  );
};

export const savePaymentMethod = (data: any) => (dispatch: any) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
