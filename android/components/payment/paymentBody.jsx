import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
//Text
import CustomText from '../../components/CustomText';
import { COLORS } from '../../constants';
import WebView from 'react-native-webview';
import { HOST } from '@env';

//PropTypes check

const { width } = Dimensions.get('window');

export const PaymentBody = ({ onOptionChange, selectedOption }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Select Payment Method</CustomText>
      <View style={styles.optionContainer}>
        <View style={styles.option}>
          <Checkbox
            color={COLORS.lighter_green}
            onPress={() => onOptionChange('cash')}
            status={selectedOption === 'cash' ? 'checked' : 'unchecked'}
          />
          <MaterialCommunityIcons
            name="cash"
            size={40}
            color={COLORS.lighter_green}
            style={{ marginLeft: 10 }}
          />
          <CustomText style={styles.optionText}>Cash</CustomText>
        </View>
        <View style={styles.option}>
          <Checkbox
            color={COLORS.lighter_green}
            onPress={() => onOptionChange('card')}
            status={selectedOption === 'card' ? 'checked' : 'unchecked'}
          />
          <MaterialCommunityIcons
            name="credit-card-outline"
            size={35}
            color={COLORS.lighter_green}
            style={{ marginLeft: 10 }}
          />
          <View style={styles.cardContainer}>
            <CustomText style={{ ...styles.optionText, marginHorizontal: 0 }}>
              Credit Card
            </CustomText>
            <Image
              style={styles.cardImage}
              source={require('../../assets/images/creditcards.png')}
            />
          </View>
        </View>
      </View>
      <Modal visible={showModal} onRequestClose={() => setShowModal(false)}>
        <WebView
          source={{ uri: `http://${HOST}:5000/paypal` }}
          onNavigationStateChange={(navState) => {
            // Handle navigation state changes
          }}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.grey,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 15,
    color: COLORS.text,
    fontWeight: '500',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  optionContainer: {
    width,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '400',
    marginHorizontal: 15,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'column',

    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  cardImage: {
    resizeMode: 'contain',
    height: 25,
    width: 100,
  },
});
