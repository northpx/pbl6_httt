import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Store } from '../../Store';
import { COLORS } from '../../constants';

const Address = ({ navigation }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { shippingAddress } = state;

  const [localAddress, setLocalAddress] = useState({
    fullName: shippingAddress?.fullName || '',
    phoneNumber: shippingAddress?.phoneNumber || '',
    province: shippingAddress?.province || '',
    district: shippingAddress?.district || '',
    commune: shippingAddress?.commune || '',
    streetName: shippingAddress?.streetName || '',
  });

  const [errors, setErrors] = useState({});

  const validateInput = () => {
    let newErrors = {};
    if (!localAddress.fullName) {
      newErrors.fullName = 'Full Name is required';
    }
    if (!localAddress.phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required';
    }
    if (!localAddress.province) {
      newErrors.province = 'Province is required';
    }
    if (!localAddress.district) {
      newErrors.district = 'District is required';
    }
    if (!localAddress.commune) {
      newErrors.commune = 'Commune is required';
    }
    if (!localAddress.streetName) {
      newErrors.streetName = 'Street Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    setLocalAddress({
      fullName: shippingAddress?.fullName || '',
      phoneNumber: shippingAddress?.phoneNumber || '',
      province: shippingAddress?.province || '',
      district: shippingAddress?.district || '',
      commune: shippingAddress?.commune || '',
      streetName: shippingAddress?.streetName || '',
    });
  }, []);

  const saveAddress = () => {
    if (validateInput()) {
      ctxDispatch({ type: 'SAVE_SHIPPING_ADDRESS', payload: localAddress });
      navigation.navigate('PaymentScreen', { navigation: navigation });
    } else {
      console.log('Validation failed');
    }
  };

  const handleChange = (name, value) => {
    setLocalAddress((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  return (
    <View style={styles.container}>
      {/* Row for Full Name and Phone Number */}
      <TouchableOpacity
        style={styles.mapSelectButton}
        onPress={() => navigation.navigate('Maps', { navigation: navigation })}
      >
        <Text style={styles.mapSelectText}>Select on Map</Text>
        <Text>{'>'}</Text>
      </TouchableOpacity>
      {errors.fullName ? (
        <Text style={styles.errorText}>{errors.fullName}</Text>
      ) : (
        errors.phoneNumber && (
          <Text style={styles.errorText}>{errors.phoneNumber}</Text>
        )
      )}

      <View style={styles.row}>
        <TextInput
          placeholder="Full Name"
          style={[styles.input, styles.flexOne]}
          value={localAddress.fullName}
          onChangeText={(text) => handleChange('fullName', text)}
        />

        <TextInput
          placeholder="Phone Number"
          style={[styles.input, styles.flexOne]}
          keyboardType="phone-pad"
          value={localAddress.phoneNumber}
          onChangeText={(text) => handleChange('phoneNumber', text)}
        />
      </View>
      {errors.province && (
        <Text style={styles.errorText}>{errors.province}</Text>
      )}
      <TextInput
        placeholder="Province"
        style={[styles.input, styles.longInput]}
        value={localAddress.province}
        onChangeText={(text) => handleChange('province', text)}
      />
      {errors.district && (
        <Text style={styles.errorText}>{errors.district}</Text>
      )}
      <TextInput
        placeholder="District"
        style={[styles.input, styles.longInput]}
        value={localAddress.district}
        onChangeText={(text) => handleChange('district', text)}
      />

      {errors.commune && <Text style={styles.errorText}>{errors.commune}</Text>}
      <TextInput
        placeholder="Commune"
        style={[styles.input, styles.longInput]}
        value={localAddress.commune}
        onChangeText={(text) => handleChange('commune', text)}
      />
      {errors.streetName && (
        <Text style={styles.errorText}>{errors.streetName}</Text>
      )}
      <TextInput
        placeholder="Street Name"
        style={[styles.input, styles.longInput]}
        value={localAddress.streetName}
        onChangeText={(text) => handleChange('streetName', text)}
      />
      <TouchableOpacity onPress={saveAddress} style={styles.button}>
        <Text style={{ color: COLORS.white }}>Save Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff', // You can change the background color
  },
  mapSelectButton: {
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row', // Align items in a row
    justifyContent: 'space-between', // Space between the items
    alignItems: 'center', // Align items vertically
    marginBottom: 20,
    borderWidth: 1,
    marginHorizontal: 3,
  },
  mapSelectText: {
    fontSize: 16,
  },
  mapSelectArrow: {
    fontSize: 16,
    // Add more styling if needed
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    fontSize: 16,
    color: 'black', // Text color
  },
  longInput: {
    marginBottom: 15,
    marginHorizontal: 3,
  },
  flexOne: {
    flex: 1,
    marginHorizontal: 5,
  },

  button: {
    backgroundColor: COLORS.primary, // Button color
    color: COLORS.white, // Text color for the button
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 3,
  },
  errorText: {
    color: COLORS.red, // Text color for the error
    fontSize: 10,
    marginHorizontal: 6,
  },
});

export default Address;
