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
import NavigationService from '../components/NavigationService.js';
import RowPoble from '../components/RowPoble';

import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import logo from '../assets/images/logo.png';

const pobles = [
  {
    id : 1,
    nom : 'Vilalba dels Arcs',
    estat : 'No hi ha cap festivitat proxima',
    festaActual : 'Festes majors 2018',
    imatge : 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Escut_de_Vilalba_dels_Arcs.svg/208px-Escut_de_Vilalba_dels_Arcs.svg.png',
  },
  {
    id : 2,
    nom : 'Batea',
    estat : 'Falten 10 dies per festes majors',
    festaActual : 'Festes majors 2018',
    imatge : 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Escut_de_Vilalba_dels_Arcs.svg/208px-Escut_de_Vilalba_dels_Arcs.svg.png',
  },
  {
    id : 3,
    nom : 'La Fatarella',
    estat : 'De festes majors!',
    festaActual : 'Festes majors 2018',
    imatge : 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Escut_de_Vilalba_dels_Arcs.svg/208px-Escut_de_Vilalba_dels_Arcs.svg.png',
  },
  {
    id : 4,
    nom : 'Gandesa',
    estat : 'No hi ha cap festivitat proxima',
    festaActual : 'Festes majors 2018',
    imatge : 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Escut_de_Vilalba_dels_Arcs.svg/208px-Escut_de_Vilalba_dels_Arcs.svg.png',
  },
  {
    id : 5,
    nom : 'Corbera d\'ebre',
    estat : 'No hi ha cap festivitat proxima',
    festaActual : 'Festes majors 2018',
    imatge : 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Escut_de_Vilalba_dels_Arcs.svg/208px-Escut_de_Vilalba_dels_Arcs.svg.png',
  },
]

const AnarAContacta = ( ) => {
  NavigationService.navigate('Contactar');
}

export default function EventScreen( props ) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={logo}  style={styles.logo}/>
        <View>
          <Text style={{marginBottom: 5, fontSize: 16}}> Selecciona una població:</Text>
          { pobles.map( poble => (
            <RowPoble key={poble.id} poble={poble} />
          )) }
        </View>
        <TouchableOpacity
          onPress={AnarAContacta}
          style={styles.footer}>
          <Text>
            Vols afegir el teu poble o tens alguna sugerencia?
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    resizeMode: 'contain', alignItems: 'flex-start',  width: '100%'
  },
  footer : {
    alignItems: 'center',
    marginTop: 25
  }

});

EventScreen.navigationOptions = {
  header: null
};
