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
import { useFetchPoble } from "../helpers/Hooks";
import NavigationService from '../components/NavigationService.js';
import RowPoble from '../components/RowPoble';
import ErrorConnexio  from '../components/ErrorConnexio';
import Colors from '../constants/Colors';
import Urls from '../constants/Urls';
import logo from '../assets/images/logo.png';

const AnarAContacta = ( ) => {
  NavigationService.navigate('Contactar', { visibilitat : 0 });
}

export default function SelectorPoblesScreen( props ) {
  const [data, loading, setLoading] = useFetchPoble(Urls.pobles);
  useEffect(() => {
    const willFocus = props.navigation.addListener(
      'willFocus',
      payload => {
        setLoading(true);
      }
    );
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <Image source={logo} style={styles.logo}/>
          {
            loading ? <View style={styles.loadingContainer}>
                <ActivityIndicator color="white" size="large"/>
              </View>
            : data && data.length ? <View>
              { data.map(( poble, index ) => (
                <RowPoble key={poble.id} index={index} poble={poble} />
              )) }
            </View>
            : <ErrorConnexio callback={setLoading.bind(this)}/>
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
    resizeMode: 'contain', alignItems: 'center', alignSelf: 'center', width: '70%', height: 220
  },
  footer : {
    alignItems: 'center',
    backgroundColor: '#ff7300',
    padding: 10,
  },
  textSeleccio : {
    marginTop: -10,
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
