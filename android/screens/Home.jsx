import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import styles from './home.style';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { Welcome } from '../components';
import Carousel from '../components/home/Carousel';
import Heading from '../components/home/Heading';
import { ProductRow } from '../components/index';
import axios from 'axios';
import { Store } from '../Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../constants';
import { HOST } from '@env';

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cartItems, shippingAddress } = state;
  const [cartNumber, setCartNumber] = useState(0);

  useEffect(() => {
    // This block of code will run whenever cartItems changes
    setCartNumber(cartItems.reduce((a, c) => a + c.quantity, 0));
    // You can update any UI components or perform other actions here
  }, [cartItems]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let userId;
        if (userInfo && cartItems.length == 0) {
          ctxDispatch({
            type: 'CART_CLEAR',
          });

          userId = userInfo._id;
          const result = await axios.get(
            `http://${HOST}:5000/api/v2/user/${userId}/cart-items`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          console.log(result.data.length);
          ctxDispatch({
            type: 'CART_SET_ITEMS',
            payload: result.data,
          });
        } else {
          // const sessionId = uuidv4();
          // userId = sessionId;
        }
      } catch (error) {}
    };
    fetchData();
  }, [userInfo]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products with a discount greater than 0
        const result = await axios.get(
          `http://${HOST}:5000/api/v2/books/with-discount`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
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
          `http://${HOST}:5000/api/v2/books/with-sold`,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Accept: 'application/json',
            },
          }
        );
        setSoldProducts(result.data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://${HOST}:5000/api/v2/books`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
        });
        setProducts(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.navigate('Maps')}>
            <Ionicons name="location-outline" size={24} />
          </TouchableOpacity>
          <Text style={styles.location}>Tokyo Japanese</Text>
          <View style={{ alignItems: 'flex-end' }}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}>{cartNumber}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Cart');
              }}
            >
              <Fontisto name="shopping-bag" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView style={styles.container}>
        <Welcome />
        <Carousel />

        {discountedProducts.length > 0 && (
          <>
            <Heading text={'Flash Sale'} products={discountedProducts} />
            <ProductRow products={discountedProducts} cartItems={cartItems} />
          </>
        )}

        {soldProducts.length > 0 && (
          <>
            <Heading text={'Best Seller'} products={soldProducts} />
            <ProductRow products={soldProducts} cartItems={cartItems} />
          </>
        )}
        <Heading text={'Featured'} products={products} />
        <ProductRow products={products} cartItems={cartItems} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
