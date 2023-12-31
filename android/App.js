import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import {
  Cart,
  Login,
  ProductDetails,
  NewRivals,
  Orders,
  SignUp,
  Maps,
  PreOrderScreen,
  PaymentScreen,
  OrderDetailScreen,
  Shops,
  CreateShop,
  ShopDetailScreen,
  CreateShopItem,
  EditShopInfo,
  Items,
  UpdateShopItem,
} from './screens';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_300Light,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import { StoreProvider } from './Store';

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_300Light,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <StoreProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Bottom Navigation"
            component={BottomTabNavigation}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ProductList"
            component={NewRivals}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Orders"
            component={Orders}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Maps"
            component={Maps}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PreOrderScreen"
            component={PreOrderScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PaymentScreen"
            component={PaymentScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="OrderDetailScreen"
            component={OrderDetailScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Shops"
            component={Shops}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CreateShop"
            component={CreateShop}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ShopDetailScreen"
            component={ShopDetailScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CreateShopItem"
            component={CreateShopItem}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditShopInfo"
            component={EditShopInfo}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Items"
            component={Items}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="UpdateShopItem"
            component={UpdateShopItem}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}
