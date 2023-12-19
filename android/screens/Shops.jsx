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
} from 'react-native';

import CustomText from '../components/CustomText';
import { BackBtn } from '../components';
import axios from 'axios';
import { COLORS, SIZES } from '../constants';
import { Store } from '../Store';
import { HOST } from '@env';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const Shops = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [shops, setShops] = useState([]);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userId = userInfo._id;
        const result = await axios.get(
          `http://${HOST}:5000/api/v2/shop/userId/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`, // Adjust this based on how you store the token
            },
          }
        );
        setShops(result.data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Failed to fetch shops:', error);
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
      <BackBtn onPress={() => navigation.goBack()} />
      <View style={styles.header}>
        <View
          style={{ position: 'absolute', bottom: 15, left: 15, zIndex: 10 }}
        ></View>
        <CustomText style={styles.titleHeader}>Manage Shops</CustomText>
        <View />
      </View>
      {loading ? (
        <View style={styles.centerLoader}>
          <ActivityIndicator />
        </View>
      ) : shops.length === 0 ? (
        <View style={styles.center}>
          <CustomText>You don't have any shop yet</CustomText>
        </View>
      ) : (
        <View>
          <FlatList
            data={shops}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.orderContainer}
                  onPress={() =>
                    navigation.navigate('ShopDetailScreen', { shop: item })
                  }
                >
                  <View style={styles.summary}>
                    <MaterialCommunityIcons
                      name="store"
                      size={30}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <View style={{ marginLeft: 10 }}>
                      <View style={styles.textContainer}>
                        <CustomText style={styles.text}>Id: </CustomText>
                        <CustomText style={styles.detail}>
                          SH-{item._id.substr(item._id.length - 10)}
                        </CustomText>
                      </View>

                      <View style={styles.textContainer}>
                        <CustomText style={styles.text}>Name: </CustomText>
                        <CustomText style={styles.detail}>
                          {item.name}
                        </CustomText>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('CreateShop')}
      >
        <Text style={styles.buttonText}>Create New Shop</Text>
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
  },
  textContainer: {
    flexDirection: 'row',
  },
});

export default Shops;
