import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { COLORS, SIZES } from '../constants';
import { BackBtn } from '../components';

const ShopDetailScreen = ({ route, navigation }) => {
  const { shop } = route.params;
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  const screenWidth = Dimensions.get('window').width - 40;
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
  };
  const handleEditShop = () => {
    // Logic to handle shop edit
    navigation.navigate('EditShopInfo', { shop: shop });
  };

  const handleManageItems = () => {
    // Logic to manage existing items
    navigation.navigate('Items', { shop: shop });
  };
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 10 }}>
        <BackBtn onPress={() => navigation.goBack()} />
      </View>
      <View style={{ marginTop: SIZES.xxLarge }}>
        <Text style={styles.title}>Shop Detail</Text>
      </View>
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/images/profile.jpeg')}
          style={styles.avatar}
        />
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.name}>{shop.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.text}>{shop.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.text}>{shop.phoneNumber}</Text>
          </View>
        </View>

        {/* <BarChart
          data={{
            labels: ['Product A', 'Product B', 'Product C'],
            datasets: [{ data: [150, 100, 200] }],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            strokeWidth: 2
          }}
          // ... other props
        /> */}
      </View>
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />
      <TouchableOpacity onPress={handleEditShop} style={styles.button}>
        <Text style={styles.buttonText}>Edit Shop Info</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleManageItems} style={styles.button}>
        <Text style={styles.buttonText}>Manage Items</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShopDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: '#f5f5f5', // Light gray background

    fontWeight: 'bold',
  },
  title: { textAlign: 'center', fontSize: 24 },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoContainer: {
    marginLeft: 5,
    justifyContent: 'flex-start',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.primary, // Blue background
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  chartContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
