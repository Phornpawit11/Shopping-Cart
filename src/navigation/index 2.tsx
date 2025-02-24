import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Image } from 'react-native';
import circlestar from '../assets/circlestar.png';
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';
import { NotFound } from './screens/NotFound';
import { ShoppingScreen } from './screens/ShoppingScreen/index';
import { CartScreen } from './screens/CartScreen/index';
import { CartSuccessScreen } from './screens/CartSuccessScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator สำหรับ Cart
const CartStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ presentation: 'fullScreenModal', headerShown: false }}
      />

    </Stack.Navigator>
  );
};

// Bottom Tab Navigator
const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Shopping"
        component={ShoppingScreen}
        options={{
          title: 'Shopping',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={circlestar} tintColor={color} style={{ width: size, height: size }} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <Image source={circlestar} tintColor={color} style={{ width: size, height: size }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Root Stack Navigator
const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CartSuccess"
        component={CartSuccessScreen}
        options={{ title: "", headerBackTitle: "Cart" }}
      />
      <Stack.Screen name="NotFound" component={NotFound} />
    </Stack.Navigator>
  );
};

// Export Navigation Component
export const Navigation = ({ onReady }: any) => {
  return (
    <NavigationContainer onReady={onReady}>
      <RootStack />
    </NavigationContainer>
  );
};