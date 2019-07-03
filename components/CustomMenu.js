import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { createDrawerNavigator, DrawerItems, SafeAreaView  } from 'react-navigation';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

export const CustomMenu = props => {
  return (
  <View style={{flex: 1, backgroundColor:Colors.llistat1}}>
    <ScrollView >
      <View style={{backgroundColor:Colors.corporatiu, paddingLeft: 10, marginBottom: -28, paddingTop: 30, paddingBottom: 10, alignItems: 'flex-start', justifyContent: 'center'}}>
        <Text style={{fontSize: 22, color: Colors.titolsPantalles}}>Vilalba dels arcs</Text>
        <Text style={{fontSize: 16, color: Colors.titolsPantalles}}>Festes majors 2019</Text>
      </View>
      <SafeAreaView style={{flex : 1}} forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
    <View style={{position:'absolute', bottom: 0, width: '100%', paddingHorizontal: 15, paddingVertical: 10, backgroundColor: Colors.fondo}}>
      <TouchableOpacity
        onPress={handleVidalFun}
        style={{flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <Text style={{textAlign: 'center', fontFamily: 'newrotic'}}>FemPoble Ⓡ 2019</Text>
      </TouchableOpacity>
    </View>
  </View>
)};

function handleVidalFun() {
  WebBrowser.openBrowserAsync(
    'https://jvidalv.github.io/josepvidal/'
  );
}
