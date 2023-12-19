import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import styles from './cart.style';
import { BackBtn, CartCard } from '../components';
import { COLORS, SIZES } from '../constants';
import { Store } from '../Store';
import axios from 'axios';
import { HOST } from '@env';
import { FlatList } from 'react-native-gesture-handler';
import { ProductCardView } from '../components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Cart = ({ navigation }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cartItems } = state;

  const [loading, setLoading] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);
  const [data, setData] = useState([]);

  const allBooks = cartItems.map((cartItem) => cartItem.book.book);

  const getAllUniqueCategories = (products) => {
    const allCategories = [];

    // Duyệt qua mỗi sản phẩm
    products.forEach((product) => {
      product.categories.forEach((category) => {
        if (!allCategories.includes(category)) {
          allCategories.push(category);
        }
      });
    });

    return allCategories;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let userId;
        if (userInfo && cartItems.lenght != 0) {
          userId = userInfo._id;
          const result = await axios.post(
            `http://${HOST}:5000/api/v2/user/update-cart`,
            {
              cartItems: cartItems,
              headers: {
                'Content-Type': 'application/json', // Adjust the content type based on your server requirements
                // Add any other headers that may be required, such as authentication tokens
              },
            }
          );
        } else {
          // const sessionId = uuidv4();
          // userId = sessionId;
        }
      } catch (error) {}
    };

    fetchData();
  }, [userInfo]);

  // useEffect(() => {
  //   const loadMoreData = async () => {
  //     if (loading) {
  //       return;
  //     }

  //     setLoading(true);

  //     // Simulate API call or fetch data from your backend
  //     // Replace this with your actual data fetching logic
  //     try {
  //       const response = await axios.post(
  //         `http://${HOST}:5000/api/v2/books/productsByCategory`,
  //         {
  //           categories: getAllUniqueCategories(allBooks),
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       );

  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   if (cartItems.length > 0) {
  //     loadMoreData();
  //   }

  //   // Thực hiện loadMoreData khi cuộn đến cuối danh sách
  // }, []);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleQuantityChange = () => {
    handleRefresh();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ marginTop: SIZES.xxLarge, marginLeft: 20 }}>
          <BackBtn onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Shopping Cart</Text>
        </View>

        <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <CartCard
              cartItem={item}
              key={item.book._id + '-' + item.shop}
              onQuantityChange={handleQuantityChange}
            />
          )}
          keyExtractor={(item) => item.book._id + '-' + item.shop}
          ListFooterComponent={() => (
            <View style={{ flex: 1 }}>
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <View style={{ marginHorizontal: 10 }}>
                  <View>
                    <Text style={styles.similarBooksTitle}>Similar Books</Text>
                  </View>
                  <FlatList
                    data={data}
                    renderItem={({ item }) => (
                      <ProductCardView product={item} cartItems={cartItems} />
                    )}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                  />
                </View>
              )}
            </View>
          )}
        />

        {/* Fixed "Total" view at the bottom */}
        <View style={styles.totalContainer}>
          {/* Text displaying the total */}
          <View style={{ flex: 1, marginLeft: 20 }}>
            <Text>
              Total: $
              {cartItems.reduce(
                (a, c) =>
                  a + c.quantity * c.book.price * (1 - c.book.discount / 100),
                0
              )}
            </Text>
          </View>

          {/* Checkout button */}
          <TouchableOpacity
            onPress={() => navigation.navigate('PreOrderScreen')}
          >
            <View style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>
                Checkout ({cartItems.reduce((a, c) => a + c.quantity, 0)})
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Cart;
