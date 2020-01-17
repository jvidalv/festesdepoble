import React, {useState} from 'react';
import {ImageBackground, ScrollView, StyleSheet, TouchableOpacity,} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import NavigationService from '../components/NavigationService.js';
import RowDia from '../components/RowDia';
import RowEsdeveniment from '../components/RowEsdeveniment';
import ErrorConnexio from '../components/ErrorConnexio';
import SenseResultats from '../components/SenseResultats';
import BarraBuscadora from '../components/BarraBuscadora';
import Colors from '../constants/Colors';
import {useFetchEvents, useFetchFestivitat} from "../helpers/Hooks";
import fondo from '../assets/images/patro-festa.jpg';

// array tonta per a carregar rows quan no hi han dades
const arrayLoader = [0, 1, 2, 3, 4, 5, 6]

const AnarAlDia = (dia) => {
    NavigationService.navigate('LlistatEvents', {dia});
}

const AnarAlEvent = (event) => {
    NavigationService.navigate('Event', {event});
}

export default function LlistatDiesScreen(props) {
    const [data, loading, setLoading] = useFetchFestivitat()
    const [filtre, setFiltre] = useState('')
    const [dataEvent, loadingEvents] = useFetchEvents(filtre)
    const searchBarProps = {setFiltre, loadingEvents, filtre}
    return (
        <ImageBackground style={styles.container} source={fondo} imageStyle={{flex: 1, resizeMode: 'repeat'}}>
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.contentContainer}
            >
                <BarraBuscadora {...searchBarProps} />
                {dataEvent && filtre ? dataEvent.length === 0 ? <SenseResultats/> : dataEvent.map((event, index) =>
                        <RowEsdeveniment
                            mostrarDia={true}
                            key={event.id}
                            index={index}
                            event={event}
                            callback={() => AnarAlEvent(event)}
                        />)
                    :
                    loading || data === false ? arrayLoader.map((dia, index) => <RowDia key={dia} index={index}/>)
                        : data && data.id && data.dies.length ? data.dies.map((dia, index) => <RowDia key={dia.id}
                                                                                                      index={index}
                                                                                                      dia={dia}
                                                                                                      callback={() => AnarAlDia(dia)}/>)
                        : <ErrorConnexio callback={setLoading.bind(this)}/>}
            </ScrollView>
        </ImageBackground>
    );
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
    contentContainer: {
        paddingTop: 0,
    },
    botoMenu: {
        flexDirection: "row", justifyContent: "flex-end", paddingRight: 20, width: 160
    }
});

LlistatDiesScreen.navigationOptions = (props) => {
    const {poble} = props.navigation.state.params;
    return {
        title: poble.festivitat.nom,
        headerBackTitle: 'Dies',
        headerStyle: {
            backgroundColor: Colors.corporatiu,
        },
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
