import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState, memo } from 'react';
import styles from './productCardView.style';
import { Store } from '../../Store';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import imageMapping from '../ImageMapping';
import AddToCartAnimation from '../AddToCartAnimation';

const ProductCardView = memo(({ product }) => {
  const navigation = useNavigation();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cartItems } = state;

  const [timeRemaining, setTimeRemaining] = useState(
    calculateTimeRemaining(product.expiryDiscount)
  );
  const [discount, setDiscount] = useState(product.discount);
  const imagePath = imageMapping[product.image];
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [buttonPosition, setButtonPosition] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = calculateTimeRemaining(product.expiryDiscount);
      setTimeRemaining(remainingTime);
      if (remainingTime === 'Discount expired') {
        setDiscount(0);
      } else {
        setDiscount(product.discount);
      }
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [product.expiryDiscount, product.discount]);

  const addToCartHandler = () => {
    setIsAddingToCart(true);

    // Simulate a delay (replace with your actual asynchronous logic)
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 3000);

    if (!userInfo) {
      navigation.navigate('Login');
      return;
    }
    const newItem = {
      user: userInfo._id,
      book: product,
    };

    const existItem = cartItems.find(
      (item) => item.user === newItem.user && item.book._id === newItem.book._id
    );

    const quantity = existItem ? existItem.quantity + 1 : 1;

    ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...newItem, quantity } });
  };

  function calculateTimeRemaining(expiryDiscount) {
    const now = new Date().getTime() / 1000; // Get current timestamp in seconds

    const timeDifference = expiryDiscount - now;
    if (timeDifference <= 0) {
      return 'Discount expired';
    }

    const days = Math.floor(timeDifference / (60 * 60 * 24));
    const hours = Math.floor((timeDifference % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((timeDifference % (60 * 60)) / 60);
    const seconds = Math.floor(timeDifference % 60);

    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  const handleLayout = (event) => {
    const { nativeEvent } = event;
    setButtonPosition(nativeEvent.layout);
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetails', { product })}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={imagePath} alt={product.slug} style={styles.image} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {product.book.title}
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            {product.shop.name}
          </Text>
          <Text style={styles.price} numberOfLines={1}>
            {discount > 0 ? (
              <>
                <Text style={{ textDecorationLine: 'line-through' }}>
                  ${product.price}
                </Text>{' '}
                <Text>
                  <Text style={{ fontWeight: 'bold' }}>${discountedPrice}</Text>
                </Text>
              </>
            ) : (
              <Text style={styles.price}>${product.price}</Text>
            )}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => addToCartHandler()}
          onLayout={handleLayout}
        >
          <Ionicons name="add-circle" size={35} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={{ alignSelf: 'flex-end', marginHorizontal: 60 }}>
        {isAddingToCart && <AddToCartAnimation startLocation={15} />}
      </View>
    </TouchableOpacity>
  );
});

export default ProductCardView;
