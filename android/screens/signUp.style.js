import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants';

const styles = StyleSheet.create({
  containerTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  cover: {
    height: SIZES.height / 2.4,
    width: SIZES.width - 60,
    resizeMode: 'contain',
    marginBottom: SIZES.large,
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: SIZES.large,
    color: COLORS.primary,
    alignItems: 'center',
  },
  wrapper: {
    marginBottom: 10,
    marginHorizontal: 20,
  },
  label: {
    fontFamily: 'Poppins_400Regular',
    fontSize: SIZES.xSmall,
    marginTop: 10,
    marginEnd: 5,
    textAlign: 'right',
  },
  inputWrapper: (borderColor) => ({
    borderColor: borderColor,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
  }),
  iconStyle: {
    marginRight: 10,
  },
  errorMessage: {
    color: COLORS.red,
    fontFamily: 'Poppins_400Regular',
    marginTop: 5,
    marginLeft: 5,
    fontSize: SIZES.xSmall,
  },
  register: {
    marginTop: -15,
    textAlign: 'right',
    marginRight: 20,
    color: COLORS.primary,
    marginBottom: 30,
  },
});

export default styles;
