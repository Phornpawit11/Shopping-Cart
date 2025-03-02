import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Navigation } from './navigation';
import { ProductManage } from './hooks/products';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';

Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/newspaper.png'),
  require('./assets/bell.png'),
  require('./assets/circlestar.png'),
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <View style={{ flex: 1 }}>
      <GestureHandlerRootView>
        <ProductManage>
          <Navigation
            onReady={() => {
              SplashScreen.hideAsync();
            }}
          />
          <Toast />
        </ProductManage>
      </GestureHandlerRootView>
    </View>

  );
}
