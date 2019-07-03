import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from './constants/Colors';
import AppNavigator from './navigation/AppNavigator';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import NavigationService from './components/NavigationService';
import LlistatDiesScreen from './screens/LlistatDiesScreen';

const TopLevelNavigator = createStackNavigator({LlistatDiesScreen : LlistatDiesScreen})
const AppContainer = createAppContainer(TopLevelNavigator);

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
        />
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
      require('./assets/images/mobile-logo.png'),
      require('./assets/images/logo.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      // 'playfair': require('./assets/fonts/PlayfairDisplay-Regular.ttf'),
      // 'playfair-bold': require('./assets/fonts/PlayfairDisplay-Bold.ttf'),
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      'newrotic': require('./assets/fonts/Newrotic.ttf'),
    }),
  ]);
}

function handleLoadingError(error: Error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
});
