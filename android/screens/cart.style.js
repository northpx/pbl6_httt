import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  titleContainer: {
    marginTop: SIZES.xxLarge,
    width: '100%',

    marginBottom: 32,
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: SIZES.xLarge,
    textAlign: 'center',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    height: 70,
    borderRadius: 5,
    justifyContent: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
  },
  similarBooksContainer: {
    marginHorizontal: 20,
  },
  similarBooksTitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 20,
  },
});

export default styles;
