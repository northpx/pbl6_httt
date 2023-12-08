import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants';

const BackBtn = ({ onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Ionicons
        name="chevron-back-circle"
        size={30}
        color={COLORS.primary}
        style={styles.backBtn}
      />
    </TouchableWithoutFeedback>
  );
};

export default BackBtn;

const styles = StyleSheet.create({
  backBtn: {
    alignItems: 'center',
    position: 'absolute',
    zIndex: 999,
    top: SIZES.large - 10,
  },
});
