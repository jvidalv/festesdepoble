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
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import NavigationService from '../components/NavigationService.js';
import RowEsdeveniment  from '../components/RowEsdeveniment';
import { compartir } from '../helpers/Compartir';

const AnarAlEvent = ( event ) => {
  NavigationService.navigate('Event', { event });
}

const AnarAContacta = ( ) => {
  NavigationService.navigate('Contactar', { visibilitat : 1 });
}


export default function LlistatEventsScreen( props ) {
  const { dia } = props.navigation.state.params;
  return (
    <View style={styles.container}>
    <ScrollView style={styles.scrollContainer}>
      { dia.events.map((event, index) => <RowEsdeveniment
        key={event.id}
        index={index}
        event={event}
        callback={() => AnarAlEvent(event)}
      />)}
    </ScrollView>
    <TouchableOpacity
      onPress={AnarAContacta}
      style={styles.footer}>
      <Text style={styles.textFooter}>
        Trobes a faltar algun esdeveniment?
      </Text>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.llistat1,
  },
  scrollContainer: {
    flex: 1,
  },
  footer : {
    alignItems: 'center',
    backgroundColor: Colors.corporatiu,
    padding: 10,
  },
  textFooter : {
    color: Colors.titolsPantalles,
    fontFamily: 'mon-medium',
  },
  botoMenu : {
   flexDirection: "row",justifyContent: "flex-end", paddingRight:20, width: 160
  }
});

LlistatEventsScreen.navigationOptions = (props) => {
  const { dia } = props.navigation.state.params;
  return {
    title: dia.nom_especial ? dia.nom_especial : dia.noms.nom_dalt + ' ' + dia.noms.nom_baix,
    headerStyle: {
      backgroundColor: Colors.corporatiu,
    },
    headerBackTitle: 'Events',
    headerTintColor: Colors.titolsPantalles,
    headerTitleStyle: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    headerRight: (
       <TouchableOpacity style={styles.botoMenu} onPress={() =>  props.navigation.openDrawer()}>
          <Ionicons name="md-menu" size={22} color={Colors.titolsPantalles} />
       </TouchableOpacity>
     )
  }
};
