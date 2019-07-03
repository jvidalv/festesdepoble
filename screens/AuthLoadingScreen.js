import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Image
} from 'react-native';
import Colors from '../constants/Colors';
import NavigationService from '../components/NavigationService.js';
import logo from '../assets/images/logo.png';

export default function AuthLoadingScreen() {

  useEffect( () => {
    const _bootstrapAsync = async () => {
      const pobleToken = await AsyncStorage.getItem('poble');
      NavigationService.navigate(pobleToken ? 'App' : 'Selector');
    };
    _bootstrapAsync()
  }, [])

  return (
    <View style={styles.container}>
      <Image source={logo}  style={styles.logo}/>
      <ActivityIndicator color="white" size="large"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fondo,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo : {
    resizeMode: 'contain', alignItems: 'flex-start',  width: '90%', marginBottom: 20
  },
});
