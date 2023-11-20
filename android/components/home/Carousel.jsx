import { View, Text } from 'react-native';
import React from 'react';
import { SliderBox } from 'react-native-image-slider-box';
import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const Carousel = () => {
  const slides = [
    'https://source.unsplash.com/1024x768/?nature',
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
    'https://source.unsplash.com/1024x768/?tree',
  ];
  return (
    <View style={styles.carouselContainer}>
      <SliderBox
        images={slides}
        dotColor={COLORS.primary}
        inactiveDotColor={COLORS.secondary}
        ImageComponentStyle={{ borderRadius: 15, width: '95%', marginTop: 15 }}
        autoplay
        circleLoop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Carousel;
