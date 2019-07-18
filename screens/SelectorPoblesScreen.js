import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import { useFetch } from "../helpers/Hooks";
import NavigationService from '../components/NavigationService.js';
import RowPoble from '../components/RowPoble';
import ErrorConnexio  from '../components/ErrorConnexio';
import Colors from '../constants/Colors';
import Urls from '../constants/Urls';
import { Ionicons } from '@expo/vector-icons';
import logo from '../assets/images/logo.png';

const AnarAContacta = ( ) => {
  NavigationService.navigate('Contactar', { visibilitat : 0 });
}

export default function SelectorPoblesScreen( props ) {
  const [data, loading, setLoading] = useFetch(Urls.pobles);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <Image source={logo} style={styles.logo}/>
          { data.length ? <View>
            <Text style={styles.textSeleccio}> Selecciona una població: </Text>
            { data.map(( poble, index ) => (
              <RowPoble key={poble.id} index={index} poble={poble} />
            )) }
          </View> :
            data === false && !loading ? <ErrorConnexio callback={setLoading.bind(this)}/>
            : <View style={styles.loadingContainer}>
                <ActivityIndicator color="white" size="large"/>
              </View>
          }
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={AnarAContacta}
        style={styles.footer}>
        <Text style={styles.textFooter}>
          Trobes a faltar el teu poble?
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fondo
  },
  contentContainer : {
    padding: 10,
    flex: 1,
    height: '100%'
  },
  logo : {
    resizeMode: 'contain', alignItems: 'center', alignSelf: 'center', width: '70%'
  },
  footer : {
    alignItems: 'center',
    backgroundColor: Colors.corporatiu,
    padding: 10,
  },
  textSeleccio : {
    marginBottom: 5,
    fontSize: 16
  },
  textFooter : {
    color: Colors.titolsPantalles,
    fontFamily: 'open-sans',
  },
  loadingContainer : {
    flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 250
  }

});

SelectorPoblesScreen.navigationOptions = {
  header: null
};
