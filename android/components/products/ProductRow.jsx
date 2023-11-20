import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SIZES } from '../../constants';
import ProductCardView from './ProductCardView';
import axios from 'axios';

const ProductRow = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products with a discount greater than 0
        const result = await axios.get(
          'http://localhost:5000/api/v2/books/with-discount'
        );
        setDiscountedProducts(result.data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products with a discount greater than 0
        const result = await axios.get(
          'http://localhost:5000/api/v2/books/with-sold'
        );
        setSoldProducts(result.data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:5000/api/v2/books');
        setProducts(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={{ marginTop: SIZES.medium }}>
      <FlatList
        data={discountedProducts}
        renderItem={({ item }) => (
          <ProductCardView product={item} navigation={navigation} />
        )}
        horizontal
        contentContainerStyle={{ columnGap: SIZES.medium }}
      />
      <FlatList
        data={soldProducts}
        renderItem={({ item }) => (
          <ProductCardView product={item} navigation={navigation} />
        )}
        horizontal
        contentContainerStyle={{ columnGap: SIZES.medium }}
      />
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCardView product={item} navigation={navigation} />
        )}
        horizontal
        contentContainerStyle={{ columnGap: SIZES.medium }}
      />
    </View>
  );
};

export default ProductRow;
