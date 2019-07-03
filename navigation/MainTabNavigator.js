import React from 'react';
import { Platform, ScrollView } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator, DrawerItems, SafeAreaView  } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import { CustomMenu } from '../components/CustomMenu';
import Colors from '../constants/Colors';

import SelectionScreen from '../screens/SelectionScreen';
import ContactarScreen from '../screens/ContactarScreen';
import LlistatDiesScreen from '../screens/LlistatDiesScreen';
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
    LlistatDies: LlistatDiesScreen,
    LlistatEvents: LlistatEventsScreen,
    Event: EventScreen,
    Opcions : OpcionsScreen,
  },
  config
);

LlistatStack.navigationOptions = {
  drawerLabel : 'Llistat de esdeveniments',
  activeTintColor : Colors.titolsPantalles,
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
  activeTintColor : Colors.titolsPantalles,
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
  activeTintColor : Colors.titolsPantalles,
  drawerIcon : ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="md-settings"
    />
  ),
};

OpcionsStack.path = '';

const SelectionStack = createStackNavigator(
  {
    Selection: SelectionScreen,
  },
  config
);

SelectionStack.navigationOptions = {
  drawerLabel : 'Canviar de poble',
  activeTintColor : Colors.titolsPantalles,
  drawerIcon : ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="md-swap"
    />
  ),
};

SelectionStack.path = '';

const ContactarStack = createStackNavigator(
  {
    Contactar: ContactarScreen,
  },
  config
);

ContactarStack.navigationOptions = {
  drawerLabel : 'Contactar',
  activeTintColor : Colors.titolsPantalles,
  drawerIcon : ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="md-mail"
    />
  ),
};

ContactarStack.path = '';

const tabNavigator = createDrawerNavigator({
      LlistatStack,
      MapaStack,
      SelectionStack,
      ContactarStack,
      OpcionsStack,
    },
    {
      contentComponent: props => CustomMenu(props),
      contentOptions: {
        activeTintColor: "black",
        activeBackgroundColor : Colors.llistat2,
        itemsContainerStyle: {
          marginVertical: 0,
        },
        iconContainerStyle: {
          opacity: 1
        }
      },
      cardStyle: {
        backgroundColor: '#f7bc8b'
      },
    }
  );

tabNavigator.path = '';

export default tabNavigator;
