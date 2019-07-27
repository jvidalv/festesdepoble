import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share
} from 'react-native';
import MapViewModal from '../components/MapViewModal';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { compartir } from '../helpers/Compartir';

export default function EventScreen( props ) {
  const { event } = props.navigation.state.params;
  return (
    <ScrollView style={styles.container}>
        <View style={[styles.contentContainer]}>
          <Text style={[styles.title, {color: Colors.roigos}]}>{event.nom}</Text>
        </View>
        <View style={[styles.contentContainer, { backgroundColor: Colors.llistat2}]}>
          <Text style={styles.titleContent}>A on és?</Text>
          <Text numberOfLines={1} style={styles.textContent}>
            {event.localitzacio}
          </Text>
        </View>
        <View style={[styles.contentContainer, { backgroundColor: Colors.llistat1}]}>
          <Text style={styles.titleContent}>Quan és?</Text>
          <Text numberOfLines={1} style={styles.textContent}>
            A les {event.hora_inici}{event.hora_fi ? ' fins les ' + event.hora_fi : ''}
          </Text>
        </View>
        <View style={[styles.contentContainer, { backgroundColor: Colors.llistat2}]}>
          <Text style={styles.titleContent}>Més informació</Text>
          <Text style={styles.textContent}>{event.descripcio}</Text>
        </View>
        { event.organitzador ? <View style={[styles.contentContainer, { backgroundColor: Colors.llistat1}]}>
          <Text style={styles.titleContent}>Organitzador</Text>
          <Text style={styles.textContent}>{event.organitzador}</Text>
        </View> : null }
        {  event.latitude && event.longitude ? <View style={[styles.contentContainer, { backgroundColor: Colors.llistat2}]}>
          <Text style={styles.titleContent}>Localització al mapa</Text>
          <MapViewModal event={event}/>
        </View> : null }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.llistat1,
  },
  contentContainer : {
    padding: 15,
    paddingVertical : 20,
  },
  title : {
    fontSize: 18,
    fontFamily: 'mon-bold',
  },
  titleContent : {
    marginBottom: 5,
    fontFamily : 'mon-bold'
  },
  textContent : {
    fontFamily: 'open-sans',
    fontSize: 16,
  },
  botoMenu : {
   flexDirection: "row",justifyContent: "flex-end", paddingRight:20, width: 160
  }
});

EventScreen.navigationOptions = ({ navigation }) => {
  const { event } = navigation.state.params;
  return {
    title: ( event.dia_inici ?? '') + ' a les ' + event.hora_inici,
    headerStyle: {
      backgroundColor: Colors.corporatiu,
    },
    headerTintColor: Colors.titolsPantalles,
    headerTitleStyle: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontSize: 18,
    },
    headerRight: (
       <View style={styles.botoMenu}>
         <TouchableOpacity
            onPress={() => compartir(event)}
           >
             <Ionicons name="md-share" size={22} color={Colors.titolsPantalles} />
         </TouchableOpacity>
       </View>
     )
  }
};
