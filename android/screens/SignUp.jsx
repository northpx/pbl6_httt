import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useState } from 'react';
import styles from './signUp.style';
import { COLORS, SIZES } from '../constants';
import { BackBtn, Button } from '../components';
import { Store } from '../Store';
import { Formik, validateYupSchem, Field } from 'formik';
import * as Yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getError } from '../utils';
import AwesomeAlert from 'react-native-awesome-alerts';
import { HOST } from '@env';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),

  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  phoneNumber: Yup.string().matches(/^(0[0-9]{9,10})$/, 'Invalid phone number'),
});

const SignUp = ({ navigation }) => {
  const [loading, setLoanding] = useState(false);
  const [arlet, setArlet] = useState({
    title: '',
    message: '',
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [obsercureText, setObsercureText] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const showAlertFunction = (title, message) => {
    setArlet({ title: title, message: message });
    setShowAlert(true);
  };

  const hideAlertFunction = () => {
    setShowAlert(false);
  };

  const validateForm = (values, validationSchema) => {
    try {
      validationSchema.validateSync(values, { abortEarly: false });
      return {}; // No errors
    } catch (validationError) {
      // Convert Yup validation error to a plain object
      return validationError.inner.reduce((errors, error) => {
        errors[error.path] = error.message;
        return errors;
      }, {});
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20, marginTop: SIZES.xxLarge }}>
        <View>
          <BackBtn onPress={() => navigation.goBack()} />
          <Image
            source={require('../assets/images/bk.png')}
            style={styles.cover}
          />
          <View style={styles.containerTitle}>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
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
              confirmButtonColor="#DD6B55"
              onCancelPressed={() => hideAlertFunction()}
              onConfirmPressed={() => hideAlertFunction()}
            />

            <Text style={styles.title}>Infinite Stories</Text>
          </View>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              // Handle form submission
              try {
                setLoanding(true);
                const { data } = await axios.post(
                  `http://${HOST}:5000/api/v2/user/register`,
                  values.phoneNumber
                    ? {
                        name: values.name,
                        email: values.email,
                        password: values.password,
                      }
                    : {
                        name: values.name,
                        email: values.email,
                        password: values.password,
                        phoneNumber: values.phoneNumber,
                      }
                );
                ctxDispatch({ type: 'USER_SIGNIN', payload: data });
                AsyncStorage.setItem('userInfo', JSON.stringify(data));
                setLoanding(false);
                navigation.navigate('Profile');
              } catch (error) {
                console.error(error);
                // You can provide a more user-friendly error message to the user here.
                showAlertFunction('Error', getError(error));
                setLoanding(false);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
              isValid,
              setFieldTouched,
            }) => (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Display Name*</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.name && errors.name
                        ? COLORS.secondary
                        : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="face-man-profile"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <Field name="name">
                      {({ field }) => (
                        <TextInput
                          onFocus={() => setFieldTouched('name')}
                          onBlur={() => setFieldTouched('name', '')}
                          autoCapitalize="none"
                          autoCorrect={false}
                          placeholder="Enter your full name"
                          style={{ flex: 1 }}
                          value={values.name}
                          onChangeText={handleChange('name')}
                        />
                      )}
                    </Field>
                  </View>

                  {touched.name && errors.name && (
                    <Text style={styles.errorMessage}>{errors.name}</Text>
                  )}
                  <Text style={styles.label}>Email*</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.email && errors.email
                        ? COLORS.secondary
                        : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <Field name="email">
                      {({ field }) => (
                        <TextInput
                          onFocus={() => setFieldTouched('email')}
                          onBlur={() => setFieldTouched('email', '')}
                          autoCapitalize="none"
                          autoCorrect={false}
                          placeholder="Enter your email address"
                          style={{ flex: 1 }}
                          value={values.email}
                          onChangeText={handleChange('email')}
                        />
                      )}
                    </Field>
                  </View>

                  {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}

                  <Text style={styles.label}>Password*</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.password ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <Field name="password">
                      {({ field }) => (
                        <TextInput
                          onChangeText={handleChange('password')}
                          onFocus={() => setFieldTouched('password')}
                          onBlur={() => setFieldTouched('password', '')}
                          value={values.password}
                          secureTextEntry={!obsercureText}
                          placeholder="Enter your password"
                          style={{ flex: 1 }}
                          autoCapitalize="none"
                        />
                      )}
                    </Field>
                    <TouchableOpacity
                      onPress={() => {
                        setObsercureText(!obsercureText);
                      }}
                    >
                      <MaterialCommunityIcons
                        name={obsercureText ? 'eye-outline' : 'eye-off-outline'}
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>

                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}

                  <Text style={styles.label}>Repeat Password*</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.repeatPassword
                        ? COLORS.secondary
                        : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <Field name="repeatPassword">
                      {({ field }) => (
                        <TextInput
                          onChangeText={handleChange('repeatPassword')}
                          onFocus={() => setFieldTouched('repeatPassword')}
                          onBlur={() => setFieldTouched('repeatPassword', '')}
                          value={values.repeatPassword}
                          secureTextEntry={!obsercureText}
                          placeholder="Enter your password"
                          style={{ flex: 1 }}
                          autoCapitalize="none"
                        />
                      )}
                    </Field>
                    <TouchableOpacity
                      onPress={() => {
                        setObsercureText(!obsercureText);
                      }}
                    >
                      <MaterialCommunityIcons
                        name={obsercureText ? 'eye-outline' : 'eye-off-outline'}
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>

                  {touched.repeatPassword && errors.repeatPassword && (
                    <Text style={styles.errorMessage}>
                      {errors.repeatPassword}
                    </Text>
                  )}

                  <Text style={styles.label}>Phone Number</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.phoneNumber ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="phone"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <Field name="phoneNumber">
                      {({ field }) => (
                        <TextInput
                          onChangeText={handleChange('phoneNumber')}
                          onFocus={() => setFieldTouched('phoneNumber')}
                          onBlur={() => setFieldTouched('phoneNumber', '')}
                          value={values.phoneNumber}
                          placeholder="Enter your phone number"
                          style={{ flex: 1 }}
                          autoCapitalize="none"
                        />
                      )}
                    </Field>
                  </View>
                  {touched.phoneNumber && errors.phoneNumber && (
                    <Text style={styles.errorMessage}>
                      {errors.phoneNumber}
                    </Text>
                  )}
                </View>

                <View style={{ marginHorizontal: 20 }}>
                  <Button
                    title="SIGNUP"
                    onPress={() => {
                      const formErrors = validateForm(values, validationSchema);

                      if (Object.keys(formErrors).length !== 0) {
                        const firstErrorField = Object.keys(formErrors)[0];
                        const errorMessage = formErrors[firstErrorField];
                        showAlertFunction(
                          'Error',
                          `${firstErrorField}: ${errorMessage}`
                        );
                      } else {
                        handleSubmit();
                      }
                    }}
                    isValid={isValid}
                  />
                </View>
                <Text
                  style={styles.register}
                  onPress={() => navigation.navigate('Login')}
                >
                  Already have an account? Login.
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUp;
