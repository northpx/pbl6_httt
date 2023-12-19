import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import CustomText from '../components/CustomText';
import { BackBtn } from '../components';
import axios from 'axios';
import { COLORS, SIZES } from '../constants';
import { Store } from '../Store';
import { HOST } from '@env';

const { height } = Dimensions.get('window');

const Orders = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [orders, setLOrders] = useState([]);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userId = userInfo._id;
        const result = await axios.get(
          `http://${HOST}:5000/api/v2/orders/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`, // Adjust this based on how you store the token
            },
          }
        );
        setLOrders(result.data); // Ensure you are accessing the correct path in the response
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Failed to fetch orders:', error);
        // Handle errors (e.g., show an error message)
      }
    };

    if (userInfo && userInfo._id) {
      fetchData();
    }
  }, [userInfo]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <View style={styles.container}>
      <BackBtn onPress={() => navigation.goBack()} />
      <View style={styles.header}>
        <View
          style={{ position: 'absolute', bottom: 15, left: 15, zIndex: 10 }}
        ></View>
        <CustomText style={styles.titleHeader}>Order History</CustomText>
        <View />
      </View>
      {loading ? (
        <View style={styles.centerLoader}>
          <ActivityIndicator />
        </View>
      ) : orders.length === 0 ? (
        <View style={styles.center}>
          <CustomText style={{ fontSize: 16 }}>
            Bạn không có đơn hàng nào!
          </CustomText>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.orderContainer}
                onPress={() =>
                  navigation.navigate('OrderDetailScreen', { order: item })
                }
              >
                <View style={styles.summary}>
                  <View style={styles.textContainer}>
                    <CustomText style={styles.text}>Code: </CustomText>
                    <CustomText style={styles.detail}>
                      CT-{item._id.substr(item._id.length - 10)}
                    </CustomText>
                  </View>

                  <View style={styles.textContainer}>
                    <CustomText style={styles.text}>Order date: </CustomText>
                    <CustomText style={styles.detail}>
                      {formatDate(item.createdAt)}
                    </CustomText>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',

    justifyContent: 'flex-end',
    height: Platform.OS === 'android' ? 70 : height < 668 ? 70 : 90,
    paddingVertical: 10,
    fontWeight: '500',
  },
  titleHeader: {
    textAlign: 'center',
    color: COLORS.light_green,
    fontSize: 20,
  },
  container: {
    flex: 1,
    marginTop: SIZES.xxLarge,
    marginHorizontal: 10,
  },
  centerLoader: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: Platform.OS === 'android' ? 70 : height < 668 ? 70 : 90,
  },
  orderContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.grey,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  detail: {
    color: COLORS.lighter_green,
  },
});

export default Orders;
