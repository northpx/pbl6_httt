import { Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

import imageMapping from '../ImageMapping';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { HOST } from '@env';

const OrderItem = ({ cartItem }) => {
  const imagePath = imageMapping[cartItem.book.book.image];
  const navigation = useNavigation();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await axios.get(
          `http://${HOST}:5000/api/v2/books/slug/${cartItem.book.slug}`
        );
        setProduct(product.data);
      } catch (error) {}
    };
    fetchData();
    setQuantity(cartItem.quantity);
  }, [cartItem]);

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductDetails', { product })}
        >
          <View style={styles.image}>
            <Image source={imagePath} style={styles.productImg} />
          </View>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.productTitle}>{cartItem.book.book.title}</Text>
          <Text style={styles.supplier}>{cartItem.book.shop.name}</Text>

          <View style={styles.rating}>
            <Text style={styles.count}> x{quantity} </Text>
          </View>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.supplier}>
            ${cartItem.book.price * cartItem.quantity}
          </Text>
        </View>
      </View>
    </View>
  );
};

import { StyleSheet } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.medium,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: '#FFF',
    ...SHADOWS.medium,
    shadowColor: COLORS.lightWhite,
    marginHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    flex: 1,
  },
  rightContent: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  image: {
    width: 70,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignContent: 'center',
  },
  productImg: {
    width: '100%',
    height: 65,
    borderRadius: SIZES.small,
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  productTitle: {
    fontSize: SIZES.medium,
    fontFamily: 'Poppins_700Bold',
    color: COLORS.primary,
  },
  supplier: {
    fontSize: SIZES.small + 2,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.gray,
    marginTop: 3,
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 5,
  },
  count: {
    alignItems: 'flex-end',
  },
});

export default OrderItem;
