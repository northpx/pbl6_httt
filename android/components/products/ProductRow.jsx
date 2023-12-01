import { FlatList, View } from 'react-native';
import React from 'react';
import { SIZES } from '../../constants';
import ProductCardView from './ProductCardView';
import styles from './productRow.style';

const ProductRow = ({ products, cartItems }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCardView product={item} cartItems={cartItems} />
        )}
        horizontal
        contentContainerStyle={{ columnGap: SIZES.medium }}
      />
    </View>
  );
};

export default ProductRow;
