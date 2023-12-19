import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
//Icon
import { Ionicons } from '@expo/vector-icons';
import CustomText from './CustomText';
//Steps
import OrderSteps from './OrderSteps';

import { COLORS, SIZES } from '../constants';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export const Header = ({ position }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.innerHeader}>
          <View
            style={{ position: 'absolute', bottom: 20, left: 15, zIndex: 10 }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="ios-arrow-back"
                size={30}
                color={COLORS.lighter_green}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.orderStepsContainer}>
            <View style={styles.orderSteps}>
              <OrderSteps position={position} />
            </View>
          </View>

          <View />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xxLarge,
    marginBottom: SIZES.xLarge,
  },
  header: {
    width: width,
    backgroundColor: '#fff',
    height: Platform.OS === 'android' ? 100 : height > 667 ? 115 : 100,
  },
  innerHeader: {
    height: '96%',
    width: '100%',
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    textAlign: 'center',
    color: COLORS.lighter_green,
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
  },
  orderStepsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  orderSteps: {
    width: (width * 50) / 100,
    marginVertical: 5,
  },
});
