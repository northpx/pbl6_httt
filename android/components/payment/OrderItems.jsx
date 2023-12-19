import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { Store } from '../../Store';
import OrderItem from './OrderItem';
import { FlatList } from 'react-native-gesture-handler';

const OrderItems = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cartItems } = state;
  return (
    <View>
      <FlatList
        scrollEnabled={false}
        data={cartItems}
        renderItem={({ item }) => (
          <OrderItem cartItem={item} key={item.book._id + '-' + item.shop} />
        )}
        keyExtractor={(item) => item.book._id + '-' + item.shop}
      />
    </View>
  );
};

export default OrderItems;

const styles = StyleSheet.create({});
