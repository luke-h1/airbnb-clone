import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderPayReducer,
} from '../reducers/orderReducer';
import {
  propertyCreateReducer,
  propertyDeleteReducer,
  propertyDetailsReducer,
  propertyListReducer,
  propertyReviewCreateReducer,
  propertyTopRatedReducer,
  propertyUpdateReducer,
} from '../reducers/propertyReducer';
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from '../reducers/userReducer';
import { cartReducer } from '../reducers/cartReducer';

const reducer = combineReducers({
  propertyList: propertyListReducer,
  propertyDetails: propertyDetailsReducer,
  propertyDelete: propertyDeleteReducer,
  propertyCreate: propertyCreateReducer,
  propertyUpdate: propertyUpdateReducer,
  propertyReviewCreate: propertyReviewCreateReducer,
  propertyTopRated: propertyTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListMyReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems') as string)
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo') as string)
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  //   @ts-ignore
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);
export default store;
