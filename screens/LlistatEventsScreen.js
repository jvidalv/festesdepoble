import React from 'react';
import {ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import {Ionicons} from '@expo/vector-icons';
import NavigationService from '../components/NavigationService.js';
import RowEsdeveniment from '../components/RowEsdeveniment';
import fondo from '../assets/images/patro-festa.jpg';

const AnarAlEvent = (event) => {
    NavigationService.navigate('Event', {event});
}

const AnarAContacta = () => {
    NavigationService.navigate('Contactar', {visibilitat: 1});
}

export default function LlistatEventsScreen(props) {
    const {dia} = props.navigation.state.params;
    return (
        <ImageBackground source={fondo} style={styles.container} imageStyle={{flex: 1, resizeMode: 'repeat'}}>
            <ScrollView style={styles.scrollContainer}>
                {dia.events.map((event, index) => <RowEsdeveniment
                    key={event.id}
                    index={index}
                    event={event}
                    callback={() => AnarAlEvent(event)}
                />)}
            </ScrollView>
            <TouchableOpacity
                onPress={AnarAContacta}
                style={styles.footer}>
                <Text style={styles.textFooter}>
                    Trobes a faltar algun esdeveniment?
                </Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: Colors.llistat1 + 'CE',
    },
    footer: {
        alignItems: 'center',
        backgroundColor: Colors.corporatiu,
        padding: 10,
    },
    textFooter: {
        color: Colors.titolsPantalles,
        fontFamily: 'mon-medium',
    },
    botoMenu: {
        flexDirection: "row", justifyContent: "flex-end", paddingRight: 20, width: 160
    }
});

LlistatEventsScreen.navigationOptions = (props) => {
    const {dia} = props.navigation.state.params;
    return {
        title: dia.nom_especial ? dia.nom_especial : dia.noms.nom_dalt + ' ' + dia.noms.nom_baix,
        headerStyle: {
            backgroundColor: Colors.corporatiu,
        },
        headerBackTitle: 'Events',
        headerTintColor: Colors.titolsPantalles,
        headerTitleStyle: {
            fontWeight: 'bold',
            textTransform: 'uppercase',
        },
        headerRight: (
            <TouchableOpacity style={styles.botoMenu} onPress={() => props.navigation.openDrawer()}>
                <Ionicons name="md-menu" size={22} color={Colors.titolsPantalles}/>
            </TouchableOpacity>
        )
    }
};
