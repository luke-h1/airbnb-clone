/* eslint-disable no-underscore-dangle */
import {
  PROPERTY_CREATE_FAIL,
  PROPERTY_CREATE_REQUEST,
  PROPERTY_CREATE_REVIEW_FAIL,
  PROPERTY_CREATE_REVIEW_REQUEST,
  PROPERTY_CREATE_REVIEW_SUCCESS,
  PROPERTY_CREATE_SUCCESS,
  PROPERTY_DELETE_FAIL,
  PROPERTY_DELETE_REQUEST,
  PROPERTY_DETAILS_FAIL,
  PROPERTY_DETAILS_REQUEST,
  PROPERTY_DETAILS_SUCCESS,
  PROPERTY_LIST_FAIL,
  PROPERTY_LIST_REQUEST,
  PROPERTY_LIST_SUCCESS,
  PROPERTY_TOP_FAIL,
  PROPERTY_TOP_REQUEST,
  PROPERTY_TOP_SUCCESS,
  PROPERTY_UPDATE_FAIL,
  PROPERTY_UPDATE_REQUEST,
  PROPERTY_UPDATE_SUCCESS,
} from '../constants/property';
import baseApi from '../utils/baseApi';
import { logout } from './userActions';

export const listProperties = (keyword: string = '', pageNumber: string = '') => async (dispatch: any) => {
  try {
    dispatch({ type: PROPERTY_LIST_REQUEST });

    const { data } = await baseApi.get(
      `/properties?keyword=${keyword}&pageNumber=${pageNumber}`,
    );

    dispatch({
      type: PROPERTY_LIST_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: PROPERTY_LIST_FAIL,
      payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
    });
  }
};

export const listPropertyDetails = (id: string) => async (dispatch: any) => {
  try {
    dispatch({ type: PROPERTY_DETAILS_REQUEST });
    const { data } = await baseApi.get(`/properties/${id}`);

    dispatch({
      type: PROPERTY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: PROPERTY_DETAILS_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const deleteProperty = (id: string) => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: PROPERTY_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    await baseApi.delete(`/products/${id}`, {
      headers: `Bearer ${userInfo.token}`,
    });
  } catch (e) {
    const message = e.response && e.response.data.message
      ? e.response.data.message
      : e.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: PROPERTY_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createProperty = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: PROPERTY_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await baseApi.post(
      '/products',
      {},
      { headers: `Bearer ${userInfo.token}` },
    );
    dispatch({
      type: PROPERTY_CREATE_SUCCESS,
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
      type: PROPERTY_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateProperty = (property: any) => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: PROPERTY_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await baseApi.put(
      `/products/${property._id}`,
      property,
      { headers: `Bearer ${userInfo.token}` },
    );

    dispatch({
      type: PROPERTY_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: PROPERTY_DETAILS_SUCCESS, payload: data });
  } catch (e) {
    const message = e.response && e.response.data.message
      ? e.response.data.message
      : e.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: PROPERTY_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const createPropertyReview = (propertyId: number, review: any) => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: PROPERTY_CREATE_REVIEW_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    await baseApi.post(`/properties/${propertyId}/reviews`, review, {
      headers: `Bearer ${userInfo.token}`,
    });

    dispatch({
      type: PROPERTY_CREATE_REVIEW_SUCCESS,
    });
  } catch (e) {
    const message = e.response && e.response.data.message
      ? e.response.data.message
      : e.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: PROPERTY_CREATE_REVIEW_FAIL,
      payload: message,
    });
  }
};

export const listTopProperties = () => async (dispatch: any) => {
  try {
    dispatch({ type: PROPERTY_TOP_REQUEST });

    const { data } = await baseApi.get('/api/properties/top');
    dispatch({
      type: PROPERTY_TOP_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: PROPERTY_TOP_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};
