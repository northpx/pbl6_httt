import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { COLORS, SIZES } from '../constants';
import { HOST } from '@env';
import { Store } from '../Store';
import { BackBtn } from '../components';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import { getError } from '../utils';

const EditShopInfo = ({ navigation, route }) => {
  const [errors, setErrors] = useState({});
  const [shopname, setShopname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [commune, setCommune] = useState('');
  const [streetName, setStreetName] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoanding] = useState(false);
  const [newShop, setNewShop] = useState({});

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const { shop } = route.params;
  console.log(shop);

  const validateInput = () => {
    let newErrors = {};
    if (!shopname) {
      newErrors.shopname = 'Shop Name is required';
    }
    if (!email) {
      newErrors.email = 'Email is required';
    }
    if (!phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required';
    }
    if (!province) {
      newErrors.province = 'Province is required';
    }
    if (!district) {
      newErrors.district = 'District is required';
    }
    if (!commune) {
      newErrors.commune = 'Commune is required';
    }
    if (!streetName) {
      newErrors.streetName = 'Street Name is required';
    }
    if (!zipcode) {
      newErrors.zipcode = 'Zip Code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createShop = async () => {
    if (validateInput()) {
      const address = `${streetName}, ${commune}, ${district}, ${province}`;
      const userId = userInfo._id;
      try {
        setLoanding(true);
        const data = await axios.put(`http://${HOST}:5000/api/v2/shop/shop`, {
          _id: shop._id,
          user: userId,
          name: shopname,
          email: email,
          address: address,
          phoneNumber: phoneNumber,
          zipCode: zipcode,
          description: description,
        });
        setNewShop(data.data);
        console.log(data.data);
        setLoanding(false);
        showAlertFunction('Updated successfully!');
      } catch (error) {
        setLoanding(false);
        showAlertFunction('Error', getError(error));
      }
    } else {
      console.log('Validation failed');
    }
  };

  const handleChange = (name, value) => {
    switch (name) {
      case 'shopname':
        setShopname(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      case 'province':
        setProvince(value);
        break;
      case 'district':
        setDistrict(value);
        break;
      case 'commune':
        setCommune(value);
        break;
      case 'streetName':
        setStreetName(value);
        break;
      case 'zipcode':
        setZipcode(value);
        break;
      case 'description':
        setDescription(value);
        break;
      default:
        break;
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  useEffect(() => {
    setShopname(shop.name);
    setPhoneNumber(shop.phoneNumber.toString());
    setEmail(shop.email.toString());
    setProvince(shop.address.split(',')[3]);
    setDistrict(shop.address.split(',')[2]);
    setCommune(shop.address.split(',')[1]);
    setStreetName(shop.address.split(',')[0]);
    setZipcode(shop.zipCode.toString());
    setDescription(shop.description);
  }, []);

  const [showAlert, setShowAlert] = useState(false);
  const [arlet, setArlet] = useState({
    title: '',
    message: '',
  });
  const showAlertFunction = (title, message) => {
    setArlet({ title: title, message: message });
    setShowAlert(true);
  };

  const hideAlertFunction = () => {
    setShowAlert(false);
    navigation.navigate('ShopDetailScreen', { shop: newShop });
  };

  return (
    <View style={styles.container}>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={arlet.title}
        message={arlet.message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Okay"
        confirmButtonColor="#008000"
        onConfirmPressed={() => hideAlertFunction()}
      />
      <View style={{ marginTop: 10 }}>
        <BackBtn onPress={() => navigation.goBack()} />
      </View>
      <Text style={styles.title}>Edit Shop Info</Text>
      {errors.shopname ? (
        <Text style={styles.errorText}>{errors.shopname}</Text>
      ) : (
        errors.phoneNumber && (
          <Text style={styles.errorText}>{errors.phoneNumber}</Text>
        )
      )}

      <View style={styles.row}>
        <TextInput
          placeholder="Shop Name"
          style={[styles.input, styles.flexOne]}
          value={shopname}
          onChangeText={(text) => handleChange('shopname', text)}
        />

        <TextInput
          placeholder="Phone Number"
          style={[styles.input, styles.flexOne]}
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={(text) => handleChange('phoneNumber', text)}
        />
      </View>
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <TextInput
        placeholder="Email"
        style={[styles.input, styles.longInput]}
        value={email}
        onChangeText={(text) => handleChange('email', text)}
      />
      {errors.province && (
        <Text style={styles.errorText}>{errors.province}</Text>
      )}
      <TextInput
        placeholder="Province"
        style={[styles.input, styles.longInput]}
        value={province}
        onChangeText={(text) => handleChange('province', text)}
      />
      {errors.district && (
        <Text style={styles.errorText}>{errors.district}</Text>
      )}
      <TextInput
        placeholder="District"
        style={[styles.input, styles.longInput]}
        value={district}
        onChangeText={(text) => handleChange('district', text)}
      />

      {errors.commune && <Text style={styles.errorText}>{errors.commune}</Text>}
      <TextInput
        placeholder="Commune"
        style={[styles.input, styles.longInput]}
        value={commune}
        onChangeText={(text) => handleChange('commune', text)}
      />
      {errors.streetName && (
        <Text style={styles.errorText}>{errors.streetName}</Text>
      )}
      <TextInput
        placeholder="Street Name"
        style={[styles.input, styles.longInput]}
        value={streetName}
        onChangeText={(text) => handleChange('streetName', text)}
      />
      {errors.zipcode && <Text style={styles.errorText}>{errors.zipcode}</Text>}
      <TextInput
        placeholder="Zip Code"
        style={[styles.input, styles.longInput]}
        value={zipcode}
        onChangeText={(text) => handleChange('zipcode', text)}
      />
      <TextInput
        placeholder="Description"
        style={[styles.input, styles.longInput]}
        value={description}
        onChangeText={(text) => handleChange('description', text)}
      />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <TouchableOpacity onPress={createShop} style={styles.button}>
        <Text style={{ color: COLORS.white }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditShopInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: COLORS.primary,
    marginTop: SIZES.xxLarge,
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
