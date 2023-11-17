import React, { createContext, useEffect, useState } from 'react';

export const Store = createContext();

const initialState = {
  fullBox: false,
  shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {},
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

export function StoreProvider(props) {
  const [state, setState] = useState(initialState);

  const dispatch = (action) => {
    switch (action.type) {
      case 'SET_FULLBOX_ON':
        setState({ ...state, fullBox: true });
        break;
      case 'SET_FULLBOX_OFF':
        setState({ ...state, fullBox: false });
        break;

      case 'USER_SIGNIN':
        setState({ ...state, userInfo: action.payload });
        break;
      case 'USER_SIGNOUT':
        setState({
          ...state,
          userInfo: null,
          cart: {
            ...state.cart,
            shippingAddress: {},
          },
        });

        break;
      case 'SAVE_SHIPPING_ADDRESS': {
        setState({
          ...state,
          cart: { ...state.cart, shippingAddress: action.payload },
        });
        break;
      }

      default:
        return state;
    }
  };

  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
