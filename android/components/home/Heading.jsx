import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './heading.style';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const Heading = ({ text, products }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{text}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProductList', { products, title: text })
          }
        >
          <Ionicons name="ios-grid" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Heading;
