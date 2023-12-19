import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { BackBtn } from '../components';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, SIZES } from '../constants';
import axios from 'axios';
import { HOST } from '@env';
import CustomText from '../components/CustomText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';

const UpdateShopItem = ({ navigation, route }) => {
  function convertToDiscountExpiry(timeRemainingInSeconds) {
    const now = new Date();
    if (!timeRemainingInSeconds) return now;
    // Convert seconds back to milliseconds and add to the current time
    const expiryTimeInMilliseconds =
      timeRemainingInSeconds * 1000 - now.getTime();
    const discountExpiry = new Date(expiryTimeInMilliseconds);

    return discountExpiry;
  }

  const { shop, book } = route.params;
  const [quantity, setQuantity] = useState(book.quantity);
  const [price, setPrice] = useState(book.price);
  const [discount, setDiscount] = useState(book.discount);
  const [discountExpiry, setDiscountExpiry] = useState(
    convertToDiscountExpiry(book.expiryDiscount)
  );
  const [loading, setLoading] = useState('');
  const [errors, setErrors] = useState({});

  const validateInput = () => {
    let newErrors = {};

    if (!quantity) {
      newErrors.quantity = 'Quantity is required';
    }
    if (!price) {
      newErrors.price = 'Price is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [showAlert, setShowAlert] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || discountExpiry;
    setDiscountExpiry(currentDate);
    setDatePickerVisibility(false); // Hide the picker after date selection
  };

  const [arlet, setArlet] = useState({
    title: '',
    message: '',
  });

  const showAlertFunction = (title, message) => {
    setArlet({ title: title, message: message });
    setShowAlert(true);
  };

  const hideAlertFunction = () => {
    setShowAlert(false);
    navigation.goBack();
  };

  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  function calculateExpiryDate(discountExpiry) {
    // Get the current date and time
    const now = new Date();

    // Ensure discountExpiry is a Date object
    const expiryDate = new Date(discountExpiry);

    // Calculate the time remaining until the expiry date in seconds
    const timeRemainingInSeconds = Math.floor(
      (expiryDate.getTime() + now.getTime()) / 1000
    );

    return timeRemainingInSeconds;
  }

  const handleSubmit = async () => {
    // Submit the data. Make sure to validate before submission
    if (validateInput()) {
      try {
        setLoading(true);
        const result = await axios.put(
          `http://${HOST}:5000/api/v2/books/shopbook`,
          discount > 0 && discountExpiry > 0
            ? {
                shop: shop._id,
                book: book.book._id,
                slug: `slug_${shop.name}_${book.book.title}`,
                price: price,
                quantity: quantity,
                discount: discount,
                expiryDiscount: calculateExpiryDate(discountExpiry),
              }
            : {
                shop: shop._id,
                book: book.book._id,
                slug: `slug_${shop.name}_${book.book.title}`,
                price: price,
                quantity: quantity,
              }
        );
        setLoading(false);
        showAlertFunction('Item created successfully!');
      } catch (error) {
        setLoading(false);
      }
    } else {
      console.log('Validation failed');
    }
  };

  return (
    <View style={styles.container}>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={arlet.title}
        message={arlet.message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Okay"
        confirmButtonColor="#008000"
        onConfirmPressed={() => hideAlertFunction()}
      />
      <View style={styles.header}>
        <View
          style={{ position: 'absolute', bottom: 15, left: 15, zIndex: 10 }}
        ></View>
        <CustomText style={styles.titleHeader}>Update Item</CustomText>
        <View />
      </View>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <BackBtn onPress={() => navigation.goBack()} />

      <TextInput
        style={styles.textInput}
        placeholder="Book Name"
        value={book.book.title}
        editable={false}
      />

      {errors.quantity && (
        <Text style={styles.errorText}>{errors.quantity}</Text>
      )}
      <TextInput
        placeholder="Quantity"
        value={String(quantity)} // Convert to string
        onChangeText={(text) => setQuantity(Number(text))} // Convert back to number on change
        style={styles.textInput}
      />
      {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
      <TextInput
        placeholder="Price"
        value={String(price)} // Convert to string
        onChangeText={(text) => setPrice(Number(text))} // Convert back to number on change
        keyboardType="numeric"
        style={styles.textInput}
      />
      <TextInput
        placeholder="Discount"
        value={discount ? String(discount) : ''} // Convert to string
        onChangeText={(text) => setDiscount(Number(text))} // Convert back to number on change
        keyboardType="numeric"
        style={styles.textInput}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.selectedDateText}>
          Expiry Date: {formatDate(discountExpiry)}
        </Text>

        <TouchableOpacity
          onPress={showDatePicker}
          style={styles.datePickerButton}
        >
          <Text style={styles.datePickerButtonText}>
            <MaterialCommunityIcons
              name="calendar"
              size={20}
              color={COLORS.gray}
              style={styles.iconStyle}
            />
          </Text>
        </TouchableOpacity>
      </View>

      {isDatePickerVisible && (
        <DateTimePicker
          value={discountExpiry}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateShopItem;

const styles = StyleSheet.create({
  header: {
    width: '100%',

    justifyContent: 'flex-end',
    height: Platform.OS === 'android' ? 70 : height < 668 ? 70 : 90,
    paddingVertical: 10,
    fontWeight: '500',
    marginBottom: 50,
  },
  titleHeader: {
    textAlign: 'center',
    color: COLORS.light_green,
    fontSize: 20,
  },
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: '#f5f5f5', // Light gray background
    marginTop: SIZES.xxLarge,
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  suggestionList: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderTopWidth: 0,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dateTimePicker: {
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: '#007bff', // Blue background
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  errorText: {
    color: COLORS.red, // Text color for the error
    fontSize: 10,
    marginHorizontal: 6,
  },
});
