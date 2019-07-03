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

const AnarAlEvent = ( event ) => {
  NavigationService.navigate('Event', { event });
}

export default function LlistatEventsScreen( props ) {
  const { dia } = props.navigation.state.params;
  return (
    <View style={styles.container}>
    <ScrollView style={styles.scrollContainer}>
      { dia.esdeveniments.map((event, index) => <RowEsdeveniment
        key={event.id}
        index={index}
        event={event}
        callback={() => AnarAlEvent(event)}
      />)}
    </ScrollView>
    {/* TODO: Funcio de navegar entre dies desde esta pantalla, estaria be fer un component instanciat */}
    <View style={{position:'absolute', bottom: 0, flexDirection: 'row', backgroundColor: Colors.corporatiu, flex: 1}}>
      <View style={{flex: 1, justifyContent: 'flex-start', alignItems:'center',  padding: 10, flexDirection: 'row'}}>
        <Ionicons name="md-arrow-dropleft-circle" size={20} color={Colors.titolsPantalles} />
      <Text style={{fontSize: 20, marginLeft: 10, color: Colors.titolsPantalles}}>Dia previ</Text>
      </View>
      <View style={{flex: 1,  alignSelf:'center',padding: 10, justifyContent: 'flex-end', alignItems:'center', flexDirection: 'row'}}>
        <Text style={{marginLeft: 'auto', fontSize: 20, marginRight: 10, color: Colors.titolsPantalles}}>Seguent dia</Text>
        <Ionicons name="md-arrow-dropright-circle" size={20} color={Colors.titolsPantalles} />
      </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  scrollContainer: {
    flex: 1,
  },
});

LlistatEventsScreen.navigationOptions = ({navigation}) => {
  const { dia } = navigation.state.params;
  return {
    title: dia.nomDia + ' ' + dia.dataDia,
    headerStyle: {
      backgroundColor: Colors.corporatiu,
    },
    headerTintColor: Colors.titolsPantalles,
    headerTitleStyle: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    headerRight: (
       <View style={{flexDirection: "row",justifyContent: "flex-end",paddingRight:10, width: 120}}>
         <TouchableOpacity
            onPress={() => navigation.openDrawer()}
           >
             <Ionicons name="md-menu" size={22} color={Colors.titolsPantalles} />
         </TouchableOpacity>
       </View>
     )
  }
};
