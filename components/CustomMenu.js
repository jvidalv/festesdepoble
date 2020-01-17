import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {DrawerItems, SafeAreaView} from 'react-navigation';
import Colors from '../constants/Colors';
import * as WebBrowser from 'expo-web-browser';
import {usePoble} from "../helpers/Storage";
import logo from '../assets/images/fem-poble-blanc.png';

export const CustomMenu = props => {
    const [loadingPoble, poble] = usePoble();

    return (
        <View style={styles.Container}>
            <ScrollView>
                {!loadingPoble ? <View style={styles.ContainerTop}>
                    <Text style={styles.TextTop}>{poble.nom}</Text>
                    <Text style={styles.SubtextTop}>{poble.festivitat.nom}</Text>
                </View> : null}
                <SafeAreaView style={{flex: 1}} forceInset={{top: 'always', horizontal: 'never'}}>
                    <DrawerItems {...props} />
                </SafeAreaView>
            </ScrollView>
            <View style={styles.ContainerBottom}>
                <TouchableOpacity
                    onPress={handleVidalFun}
                    style={styles.botoBottom}>
                    <Image source={logo} style={styles.logo}/>
                </TouchableOpacity>
            </View>
        </View>
    )
};

function handleVidalFun() {
    WebBrowser.openBrowserAsync(
        'https://www.fempoble.app'
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1, backgroundColor: Colors.llistat1
    },
    TextTop: {
        fontSize: 24, color: Colors.titolsPantalles, fontFamily: 'open-bold'
    },
    SubtextTop: {
        fontSize: 16, color: Colors.titolsPantalles, fontFamily: 'open-sans'
    },
    ContainerTop: {
        backgroundColor: Colors.corporatiu,
        paddingLeft: 10,
        marginBottom: -28,
        paddingTop: 40,
        paddingBottom: 20,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    ContainerBottom: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: Colors.corporatiu,
    },
    botoBottom: {
        flex: 1, alignItems: 'center', justifyContent: 'center', maxHeight: 50,
    },
    textBottom: {
        textAlign: 'center', fontFamily: 'newrotic', color: 'white'
    },
    logo: {
        resizeMode: 'contain', alignItems: 'center', alignSelf: 'center', width: '35%',
    },
});
