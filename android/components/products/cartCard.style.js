import { StyleSheet } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.medium,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: '#FFF',
    ...SHADOWS.medium,
    shadowColor: COLORS.lightWhite,
    marginHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    flex: 1,
  },
  rightContent: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  image: {
    width: 70,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignContent: 'center',
  },
  productImg: {
    width: '100%',
    height: 65,
    borderRadius: SIZES.small,
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  productTitle: {
    fontSize: SIZES.medium,
    fontFamily: 'Poppins_700Bold',
    color: COLORS.primary,
  },
  supplier: {
    fontSize: SIZES.small + 2,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.gray,
    marginTop: 3,
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 5,
  },
});

export default styles;
