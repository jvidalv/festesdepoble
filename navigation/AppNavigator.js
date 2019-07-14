import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import SelectorPoblesScreen from '../screens/SelectorPoblesScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import ContactarScreen from '../screens/ContactarScreen';

const SelectionStack = createStackNavigator(
  {
    SelectorPobles : SelectorPoblesScreen,
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
