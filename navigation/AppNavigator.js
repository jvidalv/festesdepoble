import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import SelectionScreen from '../screens/SelectionScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import ContactarScreen from '../screens/ContactarScreen';

const SelectionStack = createStackNavigator(
  {
    Selection : SelectionScreen,
    Contactar : ContactarScreen,
  },
  {
    cardStyle: {
      backgroundColor: '#f7bc8b'
    },
  }
);

export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Selector: SelectionStack,
    App: MainTabNavigator,
  },
  {
   initialRouteName: 'AuthLoading',
  },
  )
);
