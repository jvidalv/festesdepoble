import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default function RowDia(props) {
    const {dia, index, callback} = props;
    if (dia) {
        return (
            <TouchableOpacity
                style={[styles.Row, {backgroundColor: (index % 2 ? Colors.llistat1 : Colors.llistat2) + 'D9'}]}
                onPress={callback}
                delayPressIn={50}
            >
                <View style={[styles.BarraLateral, {backgroundColor: colors[index]}]}/>
                <View style={styles.ContainerTextLeft}>
                    <Text style={[styles.TextLeft, {fontFamily: 'open-bold', fontWeight: 'bold'}]}>
                        {dia.nom_especial ? dia.nom_especial : dia.noms.nom_dalt + ' ' + dia.noms.nom_baix}
                    </Text>
                    {dia.nom_especial ? <Text style={[styles.TextLeft, {fontSize: 16, fontFamily: 'open-sans'}]}>
                        {dia.noms.nom_dalt + ' ' + dia.noms.nom_baix}
                    </Text> : null}
                    <Text style={[styles.TextNumEvents]}>
                        {dia.numero_events} {dia.numero_events > 1 ? 'events' : 'event'}
                    </Text>
                </View>
                <View style={styles.ContainerTextRight}>
                    <Ionicons name="md-arrow-round-forward" size={20} color="black"/>
                </View>
            </TouchableOpacity>
        )
    } else {
        return (
            <View
                style={[styles.Row, {backgroundColor: (index % 2 ? Colors.llistat1 : Colors.llistat2)}]}
            >
                <View style={{width: 20, marginRight: 20, opacity: 0.5, backgroundColor: colors[index]}}/>
                <View style={styles.viewCenter}>
                    <ActivityIndicator size="large" color="white"/>
                </View>
            </View>
        )
    }
}

const colors = ['violet', 'green', 'blue', 'gold', 'red', 'indigo', 'orange', 'tan', 'linen', 'blue', 'yellow', 'teal', 'tomato']

const styles = StyleSheet.create({
    Row: {
        minHeight: 110,
        paddingRight: 20, flexDirection: 'row',
    },
    BarraLateral: {
        width: 20, marginRight: 20, opacity: 0.8
    },
    TextLeft: {
        fontSize: 20,
    },
    ContainerTextLeft: {
        paddingVertical: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    ContainerTextRight: {
        flexDirection: 'row',
        marginLeft: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextRightTop: {
        fontSize: 12,
    },
    TextRightBottom: {
        fontSize: 16,
        textTransform: 'uppercase',
        textAlign: 'right'
    },
    viewCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextNumEvents: {
        fontSize: 14, fontFamily: 'open-bold', marginTop: 5, paddingHorizontal: 3, borderRadius: 3, color: Colors.roigos
    }
});
