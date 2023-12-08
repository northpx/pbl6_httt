import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import styles from './newRivals.style';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';
import { ProductList } from '../components/index';

const NewRivals = ({ navigation, route }) => {
  const { products, title } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-circle"
              size={30}
              color={COLORS.lightWhite}
            />
          </TouchableOpacity>
          <Text style={styles.heading}> {title} </Text>
        </View>
        <ProductList products={products} />
      </View>
    </SafeAreaView>
  );
};

export default NewRivals;
