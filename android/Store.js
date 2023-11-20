import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Store = createContext();

const initialState = {
  fullBox: false,
  shippingAddress: {},
  userInfo: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };

    case 'USER_SIGNOUT':
      return {
        ...state,
        userInfo: null,
        cart: {
          ...state.cart,
          shippingAddress: {},
        },
      };

    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };

    default:
      return state;
  }
};

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedShippingAddress = await AsyncStorage.getItem(
          'shippingAddress'
        );
        const savedUserInfo = await AsyncStorage.getItem('userInfo');

        dispatch({
          type: 'SAVE_SHIPPING_ADDRESS',
          payload: savedShippingAddress ? JSON.parse(savedShippingAddress) : {},
        });

        dispatch({
          type: 'USER_SIGNIN',
          payload: savedUserInfo ? JSON.parse(savedUserInfo) : null,
        });
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    };

    fetchData();
  }, [dispatch]); // Run only once on component mount

  const enhancedDispatch = (action) => {
    // Perform async actions, if needed
    dispatch(action);

    // Save state to AsyncStorage, if needed
    if (action.type === 'USER_SIGNIN' || action.type === 'USER_SIGNOUT') {
      AsyncStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    }

    if (action.type === 'SAVE_SHIPPING_ADDRESS') {
      AsyncStorage.setItem(
        'shippingAddress',
        JSON.stringify(state.cart.shippingAddress)
      );
    }
  };

  const value = { state, dispatch: enhancedDispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
