import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Text,
  TextInput,
} from 'react-native';
import { Header, PaymentBody } from '../components';
import { COLORS, SIZES } from '../constants';
import OrderItems from '../components/payment/OrderItems';
import { Store } from '../Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { HOST } from '@env';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const PaymentScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedOption, setSelectedOption] = useState('cash');
  const [shippingFee, setShippingFee] = useState(0); // Example shipping fee
  const [discountCode, setDiscountCode] = useState('');
  const [discountedTotal, setDiscountedTotal] = useState(totalAmount);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cartItems, shippingAddress } = state;

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  const handleOrderPress = async () => {
    if (selectedOption === 'cash') {
      const { data } = await axios.post(
        `http://${HOST}:5000/api/v2/orders`,
        {
          orderItems: cartItems,
          shippingAddress: shippingAddress,
          totalPrice: discountedTotal,
          userId: userInfo._id,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: 'CART_CLEAR' });
      AsyncStorage.removeItem('cartItems');
      navigation.navigate('OrderDetailScreen', { order: data.populatedOrder });
    }
  };

  useEffect(() => {
    setTotalAmount(
      cartItems.reduce(
        (a, c) => a + c.quantity * c.book.price * (1 - c.book.discount / 100),
        0
      )
    );
    // Update discounted total when totalAmount or shippingFee changes
    setDiscountedTotal(totalAmount + shippingFee); // Add the shipping fee to total
  }, [totalAmount, shippingFee]);

  const handleApplyDiscount = () => {
    // Example discount code logic
    if (discountCode === 'DISCOUNT10') {
      setDiscountedTotal(totalAmount + shippingFee - 10); // Apply $10 discount
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header position={2} />

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <ScrollView>
              <OrderItems />
              {/* Shipping Fee Section */}
              <View style={styles.section}>
                <Text style={styles.sectionText}>
                  Shipping Fee: ${shippingFee}
                </Text>
              </View>
              {/* Discount Code Section */}
              <View style={styles.section}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter discount code"
                  value={discountCode}
                  onChangeText={setDiscountCode}
                />
                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={handleApplyDiscount}
                >
                  <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
              </View>
              {/* Total Amount */}
              <View style={styles.total}>
                <Text style={styles.totalText}>
                  Total: ${discountedTotal.toFixed(2)}
                </Text>
              </View>
              <PaymentBody
                onOptionChange={handleOptionChange}
                selectedOption={selectedOption}
              />

              <TouchableOpacity
                style={styles.orderButton}
                onPress={() => handleOrderPress()}
              >
                <Text style={styles.orderButtonText}>Purchase</Text>
              </TouchableOpacity>
            </ScrollView>
          </>
        )}
      </View>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  total: {
    padding: 10, // Add padding as needed
    alignItems: 'flex-end', // Aligns the total to the right
  },

  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black, // Adjust color as needed
  },
  orderButton: {
    backgroundColor: COLORS.lighter_green, // Use your app's color theme
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Add some margin at the bottom
    marginHorizontal: 10,
  },
  orderButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: COLORS.lighter_green,
    padding: 10,
    borderRadius: 5,
  },
  applyButtonText: {
    color: 'white',
  },
});
