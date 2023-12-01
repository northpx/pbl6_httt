import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState } from 'react';
import styles from './productDetails.style';
import {
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  Fontisto,
} from '@expo/vector-icons';
import imageMapping from '../components/ImageMapping';
import { COLORS, SIZES } from '../constants';
import { Store } from '../Store';

const ProductDetails = ({ navigation, route }) => {
  const { product } = route.params;
  const imagePath = imageMapping[product.image];

  const [count, setCount] = useState(1);

  const fullStars = Math.floor(product.ratings); // Số ngôi sao đầy đủ
  const halfStar = product.ratings % 1 >= 0.5;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cartItems } = state;
  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image source={imagePath} style={styles.image} />
      </View>
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{product.book.title}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>$ {product.price}</Text>
          </View>
        </View>
        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {Array.from({ length: 5 }, (value, index) => {
              if (index < fullStars) {
                // Ngôi sao đầy đủ
                return (
                  <Ionicons key={index} name="star" size={24} color="gold" />
                );
              } else if (index === fullStars && halfStar) {
                // Nếu phần thập phân lớn hơn hoặc bằng 0.5, tô một nửa ngôi sao
                return (
                  <Ionicons
                    key={index}
                    name="star-half"
                    size={24}
                    color="gold"
                  />
                );
              } else {
                // Ngôi sao trống
                return <Ionicons key={index} name="star-outline" size={24} />;
              }
            })}
            <Text style={styles.ratingText}>
              {' '}
              ({product.ratings.toFixed(1)})
            </Text>
          </View>
          <View style={styles.rating}>
            <TouchableOpacity
              onPress={() => {
                setCount(count + 1);
              }}
              style={styles.button}
            >
              <SimpleLineIcons
                name="plus"
                size={20}
                color={COLORS.primary}
              ></SimpleLineIcons>
            </TouchableOpacity>
            <Text style={styles.count}> {count} </Text>
            <TouchableOpacity
              onPress={() => {
                count > 1 && setCount(count - 1);
              }}
              style={styles.button}
            >
              <SimpleLineIcons
                name="minus"
                size={20}
                color={COLORS.primary}
              ></SimpleLineIcons>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.descText}>{product.book.description}</Text>
        </View>
        <View style={{ marginBottom: SIZES.small }}>
          <View style={styles.location}>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name="location-outline" size={20} />
              <Text> Tokyo</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <MaterialCommunityIcons name="truck-delivery-outline" size={20} />
              <Text> Free delivery</Text>
            </View>
          </View>
        </View>
        <View style={styles.cartRow}>
          <TouchableOpacity
            onPress={() => {
              const newItem = {
                user: userInfo._id,
                book: product,
              };
              const existItem = cartItems.find(
                (item) =>
                  item.user === newItem.user &&
                  item.book._id === newItem.book._id
              );

              const quantity = existItem ? existItem.quantity + count : 1;
              ctxDispatch({
                type: 'CART_ADD_ITEM',
                payload: { ...newItem, count },
              });
              navigation.navigate('Checkout');
            }}
            style={styles.cartBtn}
          >
            <Text style={styles.cartTitle}>BUY NOW</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              const newItem = {
                user: userInfo._id,
                book: product,
              };
              const existItem = cartItems.find(
                (item) =>
                  item.user === newItem.user &&
                  item.book._id === newItem.book._id
              );

              const quantity = existItem ? existItem.quantity + count : 1;
              ctxDispatch({
                type: 'CART_ADD_ITEM',
                payload: { ...newItem, quantity },
              });
              navigation.navigate('Cart');
            }}
            style={styles.addCart}
          >
            <Fontisto name="shopping-bag" size={24} color={COLORS.lightWhite} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;
