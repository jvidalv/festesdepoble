import React, {useState, useEffect} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavigationService from '../components/NavigationService.js';

const canviarPoble = () => {
  const eliminarDades = async () => await AsyncStorage.removeItem('poble')
  eliminarDades()
  NavigationService.navigate('AuthLoading');
}

export default function EventScreen( props ) {
  const [poble, setPoble] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('poble')
    .then((response) => JSON.parse(response))
    .then((response) => setPoble(response))
  },[])

  return ( <ScrollView style={styles.container}>
    { poble ? (
        <View style={styles.pobleContainer}>
          <Image source={{uri: poble.imatge}}  style={styles.pobleImatge}/>
          <View style={styles.pobleTextContainer}>
            <Text style={{fontSize: 28}}>
              {poble.nom}
            </Text>
            <Text style={{fontSize: 14}}>
              {poble.estat}
            </Text>
            <Text style={{fontSize: 14}}>
              {poble.festaActual}
            </Text>
          </View>
        </View>
      ) : (
      <View style={styles.pobleContainer}>
        <ActivityIndicator />
        <Text> Carregant poble ... </Text>
      </View> )
    }
    <View style={styles.containerOpcions}>
      <View style={styles.containerIcona}>
        <Ionicons name="md-log-out" size={18} color="black" />
      </View>
      <TouchableOpacity
        style={styles.containerText}
        onPress={canviarPoble}
        >
        <Text style={styles.text}>Canviar de poble</Text>
      </TouchableOpacity>
    </View>
    <View style={[styles.containerOpcions, {backgroundColor : 'gray'}]}>
      <View style={styles.containerIcona}>
        <Ionicons name="md-phone-portrait" size={18} color="black" />
      </View>
      <TouchableOpacity
        style={styles.containerText}
        >
        <Text style={styles.text}>Contactar amb soport</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.containerOpcions}>
      <View style={styles.containerIcona}>
        <Ionicons name="md-information-circle-outline" size={18} color="black" />
      </View>
      <TouchableOpacity
        style={styles.containerText}
        >
        <Text style={styles.text}>Més sobre l'aplicació</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerOpcions : {
    flexDirection : 'row', height: 60, padding: 10
  },
  containerIcona : {
    width: '10%', justifyContent: 'center', alignItems: 'center'
  },
  containerText : {
    justifyContent: 'center', marginLeft: 10
  },
  text : {
    fontSize: 18
  },
  pobleContainer : {
    flexDirection: 'row', flex: 1, minHeight:90, padding: 15
  },
  pobleImatge : {
    resizeMode: 'contain', alignItems: 'flex-start', marginHorizontal: 15, width: '18%'
  },
  pobleTextContainer : {
    justifyContent: 'center', marginLeft: 10, flex: 1
  },
});

EventScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Opcions',
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
      textTransform: 'uppercase'
    },
  }
};
