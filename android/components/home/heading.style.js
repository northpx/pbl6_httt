import { StyleSheet } from 'react-native';
import { SIZES } from '../../constants';

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.medium,
    // marginBottom: -SIZES.xSmall,
    marginHorizontal: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: SIZES.xLarge - 2,
    fontWeight: 'bold',
  },
});

export default styles;
