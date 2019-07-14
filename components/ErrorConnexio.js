import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default function ErrorConnexio(props) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 250}}>
      <TouchableOpacity
        onPress={() => props.callback(true)} >
        <Text style={{textAlign: 'center', fontFamily: 'mon-black', fontSize: 18}}> S'ha produït un error </Text>
        <Text style={{textAlign: 'center', fontFamily: 'mon-medium', fontSize: 16}}> Clica aquí per tornar-ho a intentar </Text>
      </TouchableOpacity>
    </View>
  );
}
