import React, {useEffect} from 'react';
import {ActivityIndicator, AsyncStorage, Image, StyleSheet, View} from 'react-native';
import Colors from '../constants/Colors';
import NavigationService from '../components/NavigationService.js';
import logo from '../assets/images/logo-loading.png';

export default function AuthLoadingScreen(props) {
    useEffect(() => {
        const _bootstrapAsync = async () => {
            const poble = await AsyncStorage.getItem('poble').then((response) => JSON.parse(response));
            if (poble) {
                NavigationService.navigate('LlistatDies', {poble: poble});
            } else {
                NavigationService.navigate('Selector');
            }
        };
        _bootstrapAsync()
    }, [])

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo}/>
            <ActivityIndicator color="white" size="large"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.fondo,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        resizeMode: 'contain', alignItems: 'flex-start', width: '90%', marginBottom: 20
    },
});
