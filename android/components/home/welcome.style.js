import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/index';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  welcomeTxt: (color, top) => ({
    fontFamily: 'Poppins_700Bold',
    fontSize: SIZES.xxLarge - 5,
    marginTop: top,
    color: color,
    marginHorizontal: 12,
  }),
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SIZES.small,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    height: 50,
  },
  searchIcon: {
    marginHorizontal: 10,
    color: COLORS.gray,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
  searchInput: {
    fontFamily: 'Poppins_400Regular',
    width: '100%',
    height: '100%',
    paddingHorizontal: SIZES.small,
  },
  searchBtn: {
    width: '50',
    backgroundColor: COLORS.primary,
    height: '100%',
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
