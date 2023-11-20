import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import styles from './productCardView.style';
import { Store } from '../../Store';

const ProductCardView = ({ product, navigation }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [cartItems, setCartItems] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(
    calculateTimeRemaining(product.expiryDiscount)
  );
  const [discount, setDiscount] = useState(product.discount);

  const imageExists = (path) => {
    try {
      // Sử dụng require để kiểm tra xem hình ảnh có tồn tại hay không
      require('../../assets/' + path);
      return true;
    } catch (error) {
      return false;
    }
  };

  const imagePath = imageExists(product.image)
    ? require(`../../assets/${product.image}`)
    : require('../../assets/images/notfound.png');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let userId;
        if (userInfo) {
          userId = userInfo._id;
          const result = await axios.get(
            `http://localhost:5000/api/v2/user/${userId}/cart-items`
          );
          setCartItems(result.data);
        } else {
          // const sessionId = uuidv4();
          // userId = sessionId;
        }
      } catch (error) {}
    };

    fetchData();
  }, [userInfo]);

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

  const addToCartHandler = async (item) => {
    if (!userInfo) {
      navigation.navigate('Login');
      return;
    }

    const existItem =
      cartItems.length > 0 ? cartItems.find((x) => x.book === item._id) : null;
    const quantity = existItem ? existItem.quantity + 1 : 1;

    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v2/books/slug/${item.slug}`
      );

      // Check if the product is in stock
      if (data.countInStock < quantity) {
        Alert.alert('Sorry. Product is out of stock');
        return;
      }

      const result = await axios.post(
        'http://localhost:5000/api/v2/user/update-cart',
        {
          bookId: item._id,
          quantity,
          userId: userInfo._id,
        }
      );
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
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

  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: imagePath }} />
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
              <Text>${product.price}</Text>
            )}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;
