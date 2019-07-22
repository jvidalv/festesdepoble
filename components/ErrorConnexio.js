import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import logo from '../assets/images/fem-poble-negre.png';

export default function ErrorConnexio(props) {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', minHeight: 250}}>
      <TouchableOpacity
        onPress={() => props.callback(true)} >
        <Image source={logo} style={styles.logo}/>
        <Text style={{textAlign: 'center', fontFamily: 'mon-black', fontSize: 18}}> S'ha produït un error </Text>
        <Text style={{textAlign: 'center', fontFamily: 'mon-medium', fontSize: 16}}> Clica aquí per tornar-ho a intentar </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logo : {
    resizeMode: 'contain', width: 140, height: 80, alignSelf: 'center'
  },
});
