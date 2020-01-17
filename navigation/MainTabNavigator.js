import React from 'react';
import {Platform} from 'react-native';
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import {CustomMenu} from '../components/CustomMenu';
import Colors from '../constants/Colors';

import SelectorPoblesScreen from '../screens/SelectorPoblesScreen';
import ContactarScreen from '../screens/ContactarScreen';
import LlistatDiesScreen from '../screens/LlistatDiesScreen';
import LlistatEventsScreen from '../screens/LlistatEventsScreen';
import EventScreen from '../screens/EventScreen';
import MapaScreen from '../screens/MapaScreen';

const config = Platform.select({
    web: {headerMode: 'screen'},
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
    drawerLabel: 'Los dies de festa',
    activeTintColor: Colors.titolsPantalles,
    drawerIcon: ({focused}) => (
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
        LlistatEvents: LlistatEventsScreen,
    },
    config
);

MapaStack.navigationOptions = {
    drawerLabel: 'Veure\'ls al mapa',
    activeTintColor: Colors.titolsPantalles,
    drawerIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name="md-globe"
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
    drawerLabel: 'Canviar de poble',
    activeTintColor: Colors.titolsPantalles,
    drawerIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name="md-return-left"
        />
    ),
};

SelectorPoblesStack.path = '';

const ContactarStack = createStackNavigator(
    {
        Contactar: {screen: ContactarScreen, params: {visibilitat: 1}}
    },
    config
);

ContactarStack.navigationOptions = {
    drawerLabel: 'Contactar',
    activeTintColor: Colors.titolsPantalles,
    drawerIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name="md-chatboxes"
        />
    ),
};

ContactarStack.path = '';

const tabNavigator = createDrawerNavigator({
        LlistatStack,
        MapaStack,
        ContactarStack,
        SelectorPoblesStack,
    },
    {
        contentComponent: props => CustomMenu(props),
        contentOptions: {
            activeTintColor: "black",
            activeBackgroundColor: Colors.llistat2,
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
