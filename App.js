import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import React, {useEffect, useState} from 'react';
import {AsyncStorage, Platform, StatusBar, StyleSheet, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Colors from './constants/Colors';
import AppNavigator from './navigation/AppNavigator';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import NavigationService from './components/NavigationService';
import LlistatDiesScreen from './screens/LlistatDiesScreen';
import {registerForPushNotificationsAsync} from "./helpers/PermisosPush";

const TopLevelNavigator = createStackNavigator({LlistatDiesScreen: LlistatDiesScreen})
const AppContainer = createAppContainer(TopLevelNavigator);

export default function App(props) {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [poble, setPoble] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem('poble').then((response) => setPoble(JSON.parse(response)))
        registerForPushNotificationsAsync()
    }, [])

    if (!isLoadingComplete && !props.skipLoadingScreen && poble === null) {
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
                {Platform.OS === 'ios' && <StatusBar barStyle="light-content"/>}
                <AppNavigator screenProps={{poble: poble}} ref={navigatorRef => {
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
            require('./assets/images/logo.png'),
            require('./assets/images/patro-festa.jpg'),
            require('./assets/images/fempoble.png'),
            require('./assets/images/fem-poble-negre.png'),
            require('./assets/images/fem-poble-blanc.png'),
            require('./assets/images/logo-loading.png'),
        ]),
        Font.loadAsync({
            ...Ionicons.font,
            'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
            'mon-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
            'mon-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
            'mon-black': require('./assets/fonts/Montserrat-Black.ttf'),
            'mon-medium': require('./assets/fonts/Montserrat-Medium.ttf'),
            'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
            'open-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        }),
    ]);
}

function handleLoadingError(error) {
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
