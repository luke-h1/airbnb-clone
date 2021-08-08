/* eslint-disable no-case-declarations */
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
} from '../constants/cart';

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action: any,
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      // @ts-ignore
      const existItem = state.cartItems.find((x) => x.property === item.property);

      if (existItem) {
        return {
          ...state,
          // @ts-ignore
          cartItems: state.cartItems.map((x) => (x.property === existItem.property ? item : x)),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };

    case CART_REMOVE_ITEM:
      return {
        ...state,
        // @ts-ignore
        cartItems: state.cartItems.filter((x) => x.property !== action.payload),
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
