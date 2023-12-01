import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS } from '../constants';

const Button = ({ title, onPress, isValid }) => {
  return (
    <TouchableOpacity
      style={styles.btnStyle(isValid ? COLORS.primary : COLORS.gray)}
      onPress={onPress}
    >
      <Text style={styles.btnTxt}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnTxt: {
    fontFamily: 'Poppins_700Bold',
    color: COLORS.white,
    fontSize: 18,
  },
  btnStyle: (backgroundColor) => ({
    height: 50,
    width: '100%',
    marginVertical: 20,
    backgroundColor: backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  }),
});