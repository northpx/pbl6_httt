import { ActivityIndicator, Text, View, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { COLORS, SIZES } from '../../constants';
import styles from './productList.style';
import ProductCardView from './ProductCardView';

const ProductList = ({ products }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCardView product={item} key={item._id} />
        )}
        numColumns={2}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default ProductList;
