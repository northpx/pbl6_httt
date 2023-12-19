import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
} from 'react-native';

import CustomText from '../components/CustomText';
import { BackBtn } from '../components';
import axios from 'axios';
import { COLORS, SIZES } from '../constants';
import { Store } from '../Store';
import { HOST } from '@env';
import { Ionicons } from '@expo/vector-icons';
import imageMapping from '../components/ImageMapping';
import AwesomeAlert from 'react-native-awesome-alerts';
import { MaterialIcons } from '@expo/vector-icons';
import { getError } from '../utils';

const { height } = Dimensions.get('window');

const Items = ({ navigation, route }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
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
  };
  const confirmAlertFunction = async () => {
    console.log(itemToDelete);
    setShowAlert(false);
    try {
      const result = await axios.delete(
        `http://${HOST}:5000/api/v2/books/shopbook/${itemToDelete}`
      );
    } catch (error) {
      console.error(getError(error));
    }
  };

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const { shop } = route.params;
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await axios.get(
          `http://${HOST}:5000/api/v2/books/${shop._id}`
        );
        setItems(result.data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Failed to fetch items:', error);
        // Handle errors (e.g., show an error message)
      }
    };

    if (userInfo && userInfo._id) {
      fetchData();
    }
  }, [userInfo]);

  console.log(HOST);

  return (
    <View style={styles.container}>
      <AwesomeAlert
        customView={<MaterialIcons name="warning" size={40} color="#FFA500" />}
        show={showAlert}
        showProgress={false}
        title={arlet.title}
        message={arlet.message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        confirmText="Okay"
        confirmButtonColor="#008000"
        cancelButtonColor="#FF0000"
        onConfirmPressed={() => confirmAlertFunction()}
        onCancelPressed={() => hideAlertFunction()}
      />
      <BackBtn onPress={() => navigation.goBack()} />
      <View style={styles.header}>
        <View
          style={{ position: 'absolute', bottom: 15, left: 15, zIndex: 10 }}
        ></View>
        <CustomText style={styles.titleHeader}>Manage Items</CustomText>
        <View />
      </View>
      {loading ? (
        <View style={styles.centerLoader}>
          <ActivityIndicator />
        </View>
      ) : items.length === 0 ? (
        <View style={styles.center}>
          <CustomText>You don't have any item yet</CustomText>
        </View>
      ) : (
        <View>
          <FlatList
            data={items}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.orderContainer}
                  onPress={() =>
                    navigation.navigate('UpdateShopItem', {
                      book: item,
                      shop: shop,
                    })
                  }
                >
                  <View style={styles.summary}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={styles.image}>
                        <Image
                          source={imageMapping[item.book.image]}
                          style={styles.productImg}
                        />
                      </View>
                      <View style={{ marginLeft: 10 }}>
                        <View style={styles.textContainer}>
                          <CustomText style={styles.text}>Id: </CustomText>
                          <CustomText style={styles.detail}>
                            BK-{item._id.substr(item._id.length - 10)}
                          </CustomText>
                        </View>

                        <View style={styles.textContainer}>
                          <CustomText style={styles.text}>Name: </CustomText>
                          <CustomText style={styles.detail}>
                            {item.book.title}
                          </CustomText>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setItemToDelete(item._id);
                        showAlertFunction(
                          'Are you sure you want to delete this item?'
                        );
                      }}
                    >
                      <Ionicons
                        name="trash-bin"
                        size={30}
                        color={COLORS.gray}
                        style={styles.iconStyle}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() =>
          navigation.navigate('CreateShopItem', {
            shopId: shop._id,
            shopName: shop.name,
          })
        }
      >
        <Text style={styles.buttonText}>Create New Item</Text>
      </TouchableOpacity>
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
    marginTop: 20,
  },
  detail: {
    color: COLORS.lighter_green,
  },
  buttonContainer: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: SIZES.xLarge,
  },

  // Style for the text inside the button
  buttonText: {
    color: 'white', // White text color
    textAlign: 'center', // Center the text
    fontWeight: 'bold', // Make the text bold
  },
  center: {
    paddingVertical: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 50,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignContent: 'center',
  },
  productImg: {
    width: '100%',
    height: 50,
    borderRadius: SIZES.small,
    resizeMode: 'cover',
  },
});

export default Items;
