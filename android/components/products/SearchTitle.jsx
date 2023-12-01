import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import styles from './searchTitle.style';
import imageMapping from '../ImageMapping';
import { useNavigation } from '@react-navigation/native';

const SearchTitle = ({ product }) => {
  const imagePath = imageMapping[product.image];
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('ProductDetails', { product })}
      >
        <View style={styles.image}>
          <Image source={imagePath} style={styles.productImg} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.productTitle}>{product.book.title}</Text>
          <Text style={styles.supplier}>{product.shop.name}</Text>
          <Text style={styles.supplier}>${product.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchTitle;
