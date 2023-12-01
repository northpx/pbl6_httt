import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import styles from './cartCard.style';
import imageMapping from '../ImageMapping';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import axios from 'axios';
import { Store } from '../../Store';
import AwesomeAlert from 'react-native-awesome-alerts';
import { getError } from '../../utils';
import { HOST } from '@env';

const CartCard = ({ cartItem }) => {
  const imagePath = imageMapping[cartItem.book.book.image];
  const navigation = useNavigation();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cartItems } = state;
  const [arlet, setArlet] = useState({
    title: '',
    message: '',
  });
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  const showAlertFunction = (title, message) => {
    setShowAlert(true);
    setArlet({ title: title, message: message });
  };

  const showAlertFunction1 = () => {
    setShowAlert1(true);
  };

  const hideAlertFunction = () => {
    setShowAlert(false);
    setShowAlert1(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await axios.get(
          `http://${HOST}:5000/api/v2/books/slug/${cartItem.book.slug}`
        );
        setProduct(product.data);
      } catch (error) {}
    };
    fetchData();
    setQuantity(cartItem.quantity);
  }, [cartItem]);

  const handleDelete = () => {
    try {
      ctxDispatch({
        type: 'CART_REMOVE_ITEM',
        payload: { user: userInfo._id, book: cartItem.book._id },
      });

      showAlertFunction('Delete Successful', 'Cart item deleted successfully!');
    } catch (error) {
      showAlertFunction('Faild to delete', getError(error));
    }
  };

  return (
    <View>
      <AwesomeAlert
        show={showAlert1}
        showProgress={false}
        title="Warning"
        message="Are you sure you want to delete?"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText="Continue"
        onCancelPressed={() => hideAlertFunction()}
        onConfirmPressed={() => handleDelete()}
      />

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={arlet.title}
        message={arlet.message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText="OK"
        onCancelPressed={() => hideAlertFunction()}
        onConfirmPressed={() => hideAlertFunction()}
      />

      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductDetails', { product })}
        >
          <View style={styles.image}>
            <Image source={imagePath} style={styles.productImg} />
          </View>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.productTitle}>{cartItem.book.book.title}</Text>
          <Text style={styles.supplier}>{cartItem.book.shop.name}</Text>

          <View style={styles.rating}>
            <TouchableOpacity
              onPress={async () => {
                try {
                  setQuantity(quantity + 1);
                  const item = {
                    user: userInfo._id,
                    book: cartItem.book,
                    quantity: cartItem.quantity + 1,
                  };
                  ctxDispatch({ type: 'CART_ADD_ITEM', payload: item });
                } catch (error) {}
              }}
              style={styles.button}
            >
              <SimpleLineIcons
                name="plus"
                size={20}
                color={COLORS.primary}
              ></SimpleLineIcons>
            </TouchableOpacity>
            <Text style={styles.count}> {quantity} </Text>
            <TouchableOpacity
              disabled={cartItem.quantity == 1}
              onPress={async () => {
                try {
                  setQuantity(quantity - 1);
                  const item = {
                    user: userInfo._id,
                    book: cartItem.book,
                    quantity: cartItem.quantity - 1,
                  };
                  ctxDispatch({ type: 'CART_ADD_ITEM', payload: item });
                } catch (error) {}
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
        <View style={styles.rightContent}>
          <Text style={styles.supplier}>
            ${cartItem.book.price * cartItem.quantity}
          </Text>

          <TouchableOpacity
            onPress={() => {
              showAlertFunction1();
            }}
          >
            <Ionicons name="trash-bin" size={30} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <View></View>
    </View>
  );
  x``;
};

export default CartCard;
