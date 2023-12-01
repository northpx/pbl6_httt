import { StyleSheet } from 'react-native';
import { SIZES, COLORS } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: SIZES.xLarge,
    width: SIZES.width - 44,
    zIndex: 999,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    maxHeight: 350 + SIZES.xxLarge,
    backgroundColor: COLORS.gray2,
  },
  image: {
    resizeMode: 'contain',
    height: 350,
    marginTop: SIZES.xxLarge,
  },
  details: {
    marginTop: -SIZES.large,
    backgroundColor: COLORS.lightWhite,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
  },
  titleRow: {
    marginHorizontal: 20,
    paddingBottom: SIZES.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SIZES.width - 44,
    top: 20,
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
  priceWrapper: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.large,
  },
  price: {
    paddingHorizontal: 10,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: SIZES.large,
  },
  ratingRow: {
    paddingBottom: SIZES.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SIZES.width - 10,
    top: 5,
  },
  rating: {
    top: SIZES.large,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: SIZES.large,
  },
  ratingText: {
    color: COLORS.gray,
    fontFamily: 'Poppins_500Medium',
    marginHorizontal: SIZES.xSmall,
  },
  button: {
    marginHorizontal: 5,
  },
  descriptionWrapper: {
    marginTop: SIZES.large * 2,
    marginHorizontal: SIZES.large,
  },
  description: {
    fontFamily: 'Poppins_500Medium',
    fontSize: SIZES.medium,
  },
  descText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: SIZES.small,
    textAlign: 'justify',
    marginBottom: SIZES.small,
  },
  location: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    padding: 5,
    borderRadius: SIZES.large,
    marginHorizontal: 12,
  },
  cartRow: {
    paddingBottom: SIZES.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SIZES.width,
  },
  cartBtn: {
    width: SIZES.width * 0.7,
    backgroundColor: COLORS.black,
    borderRadius: SIZES.large,
    marginLeft: 12,

    padding: SIZES.small / 2,
  },
  cartTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginLeft: SIZES.small,
  },
  addCart: {
    width: 37,
    height: 37,
    borderRadius: 50,
    margin: SIZES.small,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
