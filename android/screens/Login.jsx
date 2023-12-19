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
import styles from './login.style';
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

console.log(HOST);

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
});

const Login = ({ navigation }) => {
  const [loading, setLoanding] = useState(false);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [obsercureText, setObsercureText] = useState(false);
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
                  `http://${HOST}:5000/api/v2/user/login`,
                  {
                    email: values.email,
                    password: values.password,
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  }
                );
                ctxDispatch({ type: 'USER_SIGNIN', payload: data });
                AsyncStorage.setItem('userInfo', JSON.stringify(data));
                setLoanding(false);
                navigation.goBack();
              } catch (error) {
                console.error(error);
                // You can provide a more user-friendly error message to the user here.
                showAlertFunction('Error Arlet', getError(error));
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
                  <Text style={styles.label}>Email</Text>
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

                  <Text style={styles.label}>Password</Text>
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
                </View>

                <View style={{ marginHorizontal: 20 }}>
                  <Button
                    title="LOGIN"
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
                  onPress={() => navigation.navigate('SignUp')}
                >
                  Don't have an account? Sign up.
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Login;
