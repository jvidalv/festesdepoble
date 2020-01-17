import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import logo from '../assets/images/fem-poble-negre.png';

export default function SenseResultats(props) {
    return (
        <View style={{alignItems: 'center', justifyContent: 'center', minHeight: 250}}>
            <TouchableOpacity>
                <Image source={logo} style={styles.logo}/>
                <Text style={{textAlign: 'center', fontFamily: 'mon-black', fontSize: 18}}> Ups! No hi ha cap
                    resultat </Text>
                <Text style={{textAlign: 'center', fontFamily: 'mon-medium', fontSize: 16}}> Prova a canviar la cerca...
                    o de Poble 🤷</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        resizeMode: 'contain', width: 140, height: 80, alignSelf: 'center'
    },
});
