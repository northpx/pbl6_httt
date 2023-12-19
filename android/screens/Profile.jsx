import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import styles from './Profile.style';
import { Store } from '../Store';
import { COLORS, SIZES } from '../constants';
import { StatusBar } from 'expo-status-bar';
import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';

const Profile = ({ navigation }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [arlet, setArlet] = useState({
    title: '',
    message: '',
  });
  const [showAlert, setShowAlert] = useState(false);
  const showAlertFunction = (title, message) => {
    setShowAlert(true);
    setArlet({ title: title, message: message });
  };

  const hideAlertFunction = () => {
    setShowAlert(false);
  };

  const handleLogout = async () => {
    await ctxDispatch({ type: 'USER_SIGNOUT' });
    await AsyncStorage.clear();
    hideAlertFunction();
  };

  const deleteAccount = () => {
    Alert.alert('Logout', 'Are you sure to want to delete your account?', [
      {
        text: 'Cancel',
        onPress: () => {
          return;
        },
      },
      {
        text: 'Continue',
        onPress: () => {
          ctxDispatch({ type: 'USER_SIGNOUT' });
          AsyncStorage.clear();
        },
      },
    ]);
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
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText="Continue"
        onCancelPressed={() => hideAlertFunction()}
        onConfirmPressed={handleLogout}
      />
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.gray} />
        <View>
          <Image
            source={require('../assets/images/space.jpg')}
            style={styles.cover}
          />
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/images/profile.jpeg')}
            style={styles.profile}
          />
          <Text style={styles.name}>
            {userInfo ? userInfo.name : 'Please login into your account'}
          </Text>
          {!userInfo ? (
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}>L O G I N</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <>
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}>{userInfo.email}</Text>
              </View>

              <View style={styles.menuWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Orders');
                  }}
                >
                  <View style={styles.menuItem(0.2)}>
                    <MaterialCommunityIcons
                      name="truck-delivery-outline"
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text style={styles.menuText}>Orders</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Cart');
                  }}
                >
                  <View style={styles.menuItem(0.2)}>
                    <SimpleLineIcons
                      name="bag"
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text style={styles.menuText}>Cart</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Shops')}>
                  <View style={styles.menuItem(0.2)}>
                    <MaterialCommunityIcons
                      name="store-outline"
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text style={styles.menuText}>Manage Shops</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    showAlertFunction('', '');
                  }}
                >
                  <View style={styles.menuItem(0.2)}>
                    <AntDesign
                      name="deleteuser"
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text style={styles.menuText}>Delete Account</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    showAlertFunction(
                      'Logout',
                      'Are you sure you want to log out?'
                    );
                  }}
                >
                  <View style={styles.menuItem(0.2)}>
                    <AntDesign name="logout" size={24} color={COLORS.primary} />
                    <Text style={styles.menuText}>Logout</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default Profile;
