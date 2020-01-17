import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Colors from '../constants/Colors';

export default function BarraBuscadora(props) {
    return (
        <View>
            <SearchBar
                autoCorrect={false}
                round={true}
                lightTheme={true}
                placeholder="Buscar..."
                onChangeText={(text) => props.setFiltre(text)}
                containerStyle={{backgroundColor: Colors.corporatiu}}
                value={props.filtre}
                showLoading={props.loadingEvents}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        resizeMode: 'contain', width: 140, height: 80, alignSelf: 'center'
    },
});
