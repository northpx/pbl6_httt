import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Text } from 'react-native';
import { COLORS } from '../constants';

const AddToCartAnimation = ({ startLocation }) => {
  const translateY = useRef(new Animated.Value(startLocation)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: startLocation - 300,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [translateY]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      <Text style={styles.text}>{'+1'}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary, // Customize background color
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default AddToCartAnimation;
