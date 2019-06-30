import React from 'react';
import { Platform, ScrollView } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator, DrawerItems, SafeAreaView  } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import HomeScreen from '../screens/HomeScreen';
import LlistatEventsScreen from '../screens/LlistatEventsScreen';
import EventScreen from '../screens/EventScreen';
import OpcionsScreen from '../screens/OpcionsScreen';
import MapaScreen from '../screens/MapaScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const LlistatStack = createStackNavigator(
  {
    Home: HomeScreen,
    LlistatEvents: LlistatEventsScreen,
    Event: EventScreen,
    Opcions : OpcionsScreen,
  },
  config
);

LlistatStack.navigationOptions = {
  drawerLabel : 'Llistat de esdeveniments',
  drawerIcon : ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="md-list"
    />
  ),
};

const MapaStack = createStackNavigator(
  {
    Mapa: MapaScreen,
    Event: EventScreen,
  },
  config
);

MapaStack.navigationOptions = {
  drawerLabel : 'Esdeveniments al mapa',
  drawerIcon : ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="md-map"
    />
  ),
};


MapaStack.path = '';

const OpcionsStack = createStackNavigator(
  {
    Opcions: OpcionsScreen,
  },
  config
);

OpcionsStack.navigationOptions = {
  drawerLabel : 'Opcions',
  drawerIcon : ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="md-settings"
    />
  ),
};


OpcionsStack.path = '';

const tabNavigator = createDrawerNavigator({
    LlistatStack,
    MapaStack,
    OpcionsStack,
  },
  );

tabNavigator.path = '';

export default tabNavigator;
