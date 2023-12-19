import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Header } from '../components';
import { COLORS } from '../constants';
import CustomText from '../components/CustomText';
import OrderItem from '../components/payment/OrderItem';

const OrderDetailScreen = ({ route, navigation }) => {
  const { order } = route.params;
  const [showDetails, setShowDetails] = useState(false);

  // Format the date for readability
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const NumberFormat = ({ price, style }) => {
    // Format the price using Intl.NumberFormat or any other method
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD', // Change currency code as needed
    }).format(price);

    // Return the formatted price as a string within a Text component
    return <Text style={style}>{formattedPrice}</Text>;
  };

  return (
    <ScrollView style={styles.container}>
      <Header position={4} />
      <View style={styles.orderContainer}>
        <View style={styles.summary}>
          <View style={styles.textContainer}>
            <CustomText style={styles.text}>Mã đơn: </CustomText>
            <CustomText style={styles.detail}>
              CT-{order._id.substr(order._id.length - 10)}
            </CustomText>
          </View>

          <View style={styles.textContainer}>
            <CustomText style={styles.text}>Ngày đặt: </CustomText>
            <CustomText style={styles.detail}>
              {formatDate(order.createdAt)}
            </CustomText>
          </View>
          <View style={styles.detailButtom}>
            <TouchableOpacity onPress={() => setShowDetails((prev) => !prev)}>
              <CustomText style={{ fontSize: 15, color: '#fff' }}>
                {showDetails ? 'Hide Orders' : 'Order Details'}
              </CustomText>
            </TouchableOpacity>
          </View>
          {showDetails ? (
            <View>
              <View style={styles.textContainer}>
                <CustomText style={styles.text}>Tên người nhận: </CustomText>
                <CustomText style={styles.detail}>
                  {order.shippingAddress.fullName}
                </CustomText>
              </View>

              <View style={styles.textContainer}>
                <CustomText style={styles.text}>Địa chỉ: </CustomText>
                <CustomText style={styles.detail}>
                  {order.shippingAddress.streetName},{' '}
                  {order.shippingAddress.commune},{' '}
                  {order.shippingAddress.district},{' '}
                  {order.shippingAddress.province}
                </CustomText>
              </View>
              <View style={styles.textContainer}>
                <CustomText style={styles.text}>Số điện thoại: </CustomText>
                <CustomText style={styles.detail}>
                  {order.shippingAddress.phoneNumber}
                </CustomText>
              </View>

              <CustomText style={styles.text}>Sản phẩm đã đặt:</CustomText>
              <FlatList
                scrollEnabled={false}
                data={order.orderItems}
                renderItem={({ item }) => (
                  <OrderItem
                    cartItem={item}
                    key={item.book._id + '-' + item.shop}
                  />
                )}
                keyExtractor={(item) => item.book._id + '-' + item.shop}
              />
              <View
                style={{
                  ...styles.textContainer,
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}
              >
                <CustomText style={styles.text}>Tổng tiền:</CustomText>
                <NumberFormat
                  price={order.totalPrice.toString()}
                  style={{ fontSize: 15 }}
                />
              </View>
            </View>
          ) : (
            <View />
          )}
          <TouchableOpacity
            style={styles.continueShoppingButton}
            onPress={() => {
              navigation.navigate('Home');
            }}
          >
            <Text style={styles.continueShoppingButtonText}>
              Continue Shopping
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.white,
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
  detailButtom: {
    backgroundColor: COLORS.lighter_green,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 15,
  },
  textContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  detail: {
    color: COLORS.lighter_green,
  },
  steps: {
    width: '100%',
    height: 100,
  },
  continueShoppingButton: {
    backgroundColor: COLORS.primary, // Adjust the color as needed
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  continueShoppingButtonText: {
    color: '#fff', // Adjust the color as needed
    fontSize: 16,
  },
});

export default OrderDetailScreen;
