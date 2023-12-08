import React, { useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { COLORS, SIZES } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import { Store } from '../Store';

const Checkout = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cartItems, shippingAddress } = state;

  return (
    <SafeAreaView style={{ flex: 1, marginTop: SIZES.xxLarge }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Địa chỉ thông tin nhận hàng */}
        <View style={styles.addressContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons
              name="location"
              size={24}
              color="black"
              style={styles.icon}
            />

            <Text> Shipping Address</Text>
          </View>
          {shippingAddress.name ? (
            <TouchableOpacity>
              <Text style={{ marginTop: 20 }}>
                {shippingAddress.name} {shippingAddress.phone}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <Text>Add Shipping Address</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ScrollView để hiển thị item trong giỏ hàng */}
        <ScrollView style={{ flex: 1 }}>
          {/* Hiển thị các item trong giỏ hàng */}
          {/* ... */}
        </ScrollView>

        {/* Phương thức thanh toán */}
        <View style={styles.paymentMethodContainer}>
          {/* Thêm các thành phần hiển thị phương thức thanh toán */}
          <Text style={{ color: COLORS.green }}>Payment Method: Paypal</Text>
          {/* ... */}
        </View>

        {/* Phí ship */}
        <View style={styles.shippingFeeContainer}>
          {/* Thêm các thành phần hiển thị phí ship */}
          <Text>Shipping Fee:</Text>
          {/* ... */}
        </View>
      </ScrollView>

      {/* Tổng thanh toán và nút đặt hàng */}
      <View style={styles.totalPaymentContainer}>
        {/* Hiển thị tổng thanh toán */}
        <Text>Total Payment: $100.00</Text>

        {/* Nút đặt hàng */}
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  addressContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  paymentMethodContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  shippingFeeContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 10,
  },
  totalPaymentContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  checkoutButton: {
    backgroundColor: '#00f',
    padding: 10,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: '#fff',
  },
};

export default Checkout;
