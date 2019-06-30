import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import SelectionScreen from '../screens/SelectionScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const SelectionStack = createStackNavigator(
  { Selection: SelectionScreen },
  {
    cardStyle: { backgroundColor: '#f7bc8b' },
  }
);

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthLoading: AuthLoadingScreen,
    Selector: SelectionStack,
    App: MainTabNavigator,
  },
  {
   initialRouteName: 'AuthLoading',
  },
  )
);
