import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/index';

const styles = StyleSheet.create({
  container: { marginBottom: 130 },
  textStyle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 40,
  },
  appBarWrapper: {
    marginHorizontal: 22,
    marginTop: SIZES.xxLarge,
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  cartCount: {
    position: 'absolute',
    bottom: 16,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  cartNumber: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 10,
    color: COLORS.lightWhite,
    fontWeight: '600',
  },
});

export default styles;
