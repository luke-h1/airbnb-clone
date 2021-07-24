import {
  LOGIN, LOGOUT, ME, REGISTER,
} from './types';

export default (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload, loading: false };

    case LOGOUT:
      return { ...state, user: null, loading: false };

    case REGISTER:
      return { ...state, user: action.payload, loading: false };

    case ME:
      return { ...state, loading: false };

    default:
      return state;
  }
};
