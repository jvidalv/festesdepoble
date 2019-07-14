import React from 'react';
import { Platform, ScrollView } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator, DrawerItems, SafeAreaView  } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import { CustomMenu } from '../components/CustomMenu';
import Colors from '../constants/Colors';

import SelectorPoblesScreen from '../screens/SelectorPoblesScreen';
import ContactarScreen from '../screens/ContactarScreen';
import LlistatDiesScreen from '../screens/LlistatDiesScreen';
import LlistatEventsScreen from '../screens/LlistatEventsScreen';
import EventScreen from '../screens/EventScreen';
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

const SelectorPoblesStack = createStackNavigator(
  {
    SelectorPobles: SelectorPoblesScreen,
  },
  config
);

SelectorPoblesStack.navigationOptions = {
  drawerLabel : 'Canviar de poble',
  activeTintColor : Colors.titolsPantalles,
  drawerIcon : ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="md-swap"
    />
  ),
};

SelectorPoblesStack.path = '';

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
      SelectorPoblesStack,
      ContactarStack,
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
