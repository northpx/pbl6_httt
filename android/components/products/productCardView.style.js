import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const styles = StyleSheet.create({
  container: {
    width: 182,
    height: 360,
    marginEnd: 22,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.secondary,
  },
  imageContainer: {
    flex: 1,
    marginLeft: SIZES.small / 2,
    marginTop: SIZES.small / 2,
    borderRadius: SIZES.small,
    overflow: 'hidden',
    backgroundColor: COLORS.gray2,
  },
  image: {
    flex: 1, // Set flex to 1 to ensure the image takes up the entire container
    width: undefined, // Set width and height to undefined
    height: undefined,
    resizeMode: 'contain',
  },
  details: {
    padding: SIZES.small,
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: SIZES.medium,
    marginBottom: 2,
  },
  supplier: {
    fontFamily: 'Poppins_400Regular',
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  price: {
    fontFamily: 'Poppins_700Bold',
    fontSize: SIZES.medium,
  },
  addBtn: {
    position: 'absolute',
    bottom: SIZES.xSmall,
    right: SIZES.xSmall,
  },
});

export default styles;
