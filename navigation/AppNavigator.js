import React from 'react';
import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import SelectorPoblesScreen from '../screens/SelectorPoblesScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import ContactarScreen from '../screens/ContactarScreen';

const SelectionStack = createStackNavigator(
    {
        SelectorPobles: SelectorPoblesScreen,
        Contactar: {screen: ContactarScreen, params: {amagarMenu: true}},
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
