import {
  PROPERTY_LIST_REQUEST,
  PROPERTY_LIST_SUCCESS,
  PROPERTY_LIST_FAIL,
  PROPERTY_DETAILS_REQUEST,
  PROPERTY_DETAILS_SUCCESS,
  PROPERTY_DETAILS_FAIL,
  PROPERTY_DELETE_REQUEST,
  PROPERTY_DELETE_SUCCESS,
  PROPERTY_DELETE_FAIL,
  PROPERTY_CREATE_RESET,
  PROPERTY_CREATE_FAIL,
  PROPERTY_CREATE_SUCCESS,
  PROPERTY_CREATE_REQUEST,
  PROPERTY_UPDATE_REQUEST,
  PROPERTY_UPDATE_SUCCESS,
  PROPERTY_UPDATE_FAIL,
  PROPERTY_UPDATE_RESET,
  PROPERTY_CREATE_REVIEW_REQUEST,
  PROPERTY_CREATE_REVIEW_SUCCESS,
  PROPERTY_CREATE_REVIEW_FAIL,
  PROPERTY_CREATE_REVIEW_RESET,
  PROPERTY_TOP_REQUEST,
  PROPERTY_TOP_SUCCESS,
  PROPERTY_TOP_FAIL,
} from '../constants/property';

export const propertyListReducer = (
  state = { properties: [] },
  action: any,
) => {
  switch (action.type) {
    case PROPERTY_LIST_REQUEST:
      return { loading: true, properties: [] };

    case PROPERTY_LIST_SUCCESS:
      return {
        loading: false,
        properties: action.payload.properties,
        pages: action.payload.pages,
        page: action.payload.page,
      };

    case PROPERTY_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const propertyDetailsReducer = (
  state = { property: { reviews: [] } },
  action: any,
) => {
  switch (action.type) {
    case PROPERTY_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PROPERTY_DETAILS_SUCCESS:
      return { loading: false, property: action.payload };
    case PROPERTY_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const propertyDeleteReducer = (state = {}, action: any) => {
  switch (action.type) {
    case PROPERTY_DELETE_REQUEST:
      return { loading: true };
    case PROPERTY_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PROPERTY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const propertyCreateReducer = (state = {}, action: any) => {
  switch (action.type) {
    case PROPERTY_CREATE_REQUEST:
      return { loading: true };
    case PROPERTY_CREATE_SUCCESS:
      return { loading: false, success: true, property: action.payload };
    case PROPERTY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PROPERTY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const propertyUpdateReducer = (
  state = { property: {} },
  action: any,
) => {
  switch (action.type) {
    case PROPERTY_UPDATE_REQUEST:
      return { loading: true };
    case PROPERTY_UPDATE_SUCCESS:
      return { loading: false, success: true, property: action.payload };
    case PROPERTY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PROPERTY_UPDATE_RESET:
      return { property: {} };
    default:
      return state;
  }
};

export const propertyReviewCreateReducer = (state = {}, action: any) => {
  switch (action.type) {
    case PROPERTY_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PROPERTY_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PROPERTY_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PROPERTY_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const propertyTopRatedReducer = (
  state = { properties: [] },
  action: any,
) => {
  switch (action.type) {
    case PROPERTY_TOP_REQUEST:
      return { loading: true, properties: [] };
    case PROPERTY_TOP_SUCCESS:
      return { loading: false, properties: action.payload };
    case PROPERTY_TOP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
