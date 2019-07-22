import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavigationService from './NavigationService.js';
import Colors from '../constants/Colors';

export default function RowPoble({poble, index}) {

  const guardarPoble = () => {
    const guardar = async () => {
      await AsyncStorage.removeItem('poble')
      await AsyncStorage.removeItem('events')
      await AsyncStorage.setItem('poble', JSON.stringify(poble))
      NavigationService.navigate('AuthLoading', { poble : poble } );
    }
    guardar()
  }

  return (
    <TouchableOpacity
      style={[styles.pobleContainer, { backgroundColor : ( index % 2 ? Colors.llistat1: Colors.llistat2 )}]}
      onPress={poble.festivitat.id !== false ? guardarPoble : () => false}
      delayPressIn={50}
      >
      <Image source={{uri: 'https://admin.fempoble.app' + poble.imatge_url}}  style={styles.pobleImatge}/>
      <View style={styles.pobleTextContainer}>
        <Text style={{fontFamily:'mon-bold', fontSize: 22}}>
          {poble.nom}
        </Text>
        <Text style={{fontFamily:'open-sans',fontSize: 12}}>
          {poble.festivitat.informacio}
        </Text>
      </View>
      { poble.festivitat.id !== false ? <View style={styles.pobleIconaDreta}>
        <Ionicons name="md-arrow-forward" size={24} color="black" />
      </View> : null }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  pobleContainer : {
   flexDirection: 'row', flex: 1, minHeight:70, padding: 10,
   borderRadius: 5, marginVertical: 2
  },
  pobleImatge : {
    resizeMode: 'contain', alignItems: 'flex-start',  width: '13%'
  },
  pobleTextContainer : {
    justifyContent: 'center', marginLeft: 10, flex: 1
  },
  pobleIconaDreta :{
    justifyContent: 'center', alignItems: 'center', marginLeft: 10, width: '10%'
  }
});
