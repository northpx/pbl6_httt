import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Store = createContext();

const initialState = {
  shippingAddress: {},
  userInfo: null,
  cartItems: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };

    case 'USER_SIGNOUT':
      return {
        ...state,
        userInfo: null,
        cartItems: [], // Clear cartItems on signout
        shippingAddress: {},
      };

    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case 'CART_SET_ITEMS': {
      return { ...state, cartItems: action.payload };
    }
    case 'CART_ADD_ITEM':
      const newItem = action.payload;
      const existItemIndex = state.cartItems.findIndex(
        (item) =>
          item.book._id === newItem.book._id && item.user === newItem.user
      );
      if (existItemIndex !== -1) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existItemIndex] = newItem;
        return { ...state, cartItems: updatedCartItems };
      } else {
        return { ...state, cartItems: [...state.cartItems, newItem] };
      }
    case 'CART_REMOVE_ITEM':
      const itemDelete = action.payload;
      const cartItems = state.cartItems.filter(
        (item) =>
          !(item.user === itemDelete.user && item.book._id === itemDelete.book)
      );
      return { ...state, cartItems: cartItems };
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
        const savedCartItems = await AsyncStorage.getItem('cartItems');

        dispatch({
          type: 'SAVE_SHIPPING_ADDRESS',
          payload: savedShippingAddress ? JSON.parse(savedShippingAddress) : {},
        });

        dispatch({
          type: 'USER_SIGNIN',
          payload: savedUserInfo ? JSON.parse(savedUserInfo) : null,
        });

        dispatch({
          type: 'CART_SET_ITEMS',
          payload: savedCartItems ? JSON.parse(savedCartItems) : [],
        });
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (state.cartItems.lenght > 0) {
      AsyncStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }
  }, [state.cartItems]);

  const enhancedDispatch = async (action) => {
    // Perform async actions, if needed
    dispatch(action);

    // Save state to AsyncStorage, if needed
    if (action.type === 'USER_SIGNIN' || action.type === 'USER_SIGNOUT') {
      AsyncStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    }

    if (action.type === 'SAVE_SHIPPING_ADDRESS') {
      AsyncStorage.setItem(
        'shippingAddress',
        JSON.stringify(state.shippingAddress)
      );
    }
    if (action.type === 'CART_ADD_ITEM') {
      AsyncStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }
  };

  const value = { state, dispatch: enhancedDispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
