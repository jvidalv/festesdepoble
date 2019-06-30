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
import RowEsdeveniment  from '../components/RowEsdeveniment';


const AnarAlEvent = ( event ) => {
  NavigationService.navigate('Event', { event });
}

export default function LlistatEventsScreen( props ) {
  const { dia } = props.navigation.state.params;
  return (
    <ScrollView style={styles.container}>
      { dia.esdeveniments.map( event => <RowEsdeveniment key={event.id} event={event} callback={() => AnarAlEvent(event)} />)}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

LlistatEventsScreen.navigationOptions = ({navigation}) => {
  const { dia } = navigation.state.params;
  return {
    title: dia.nomDia + ' ' + dia.dataDia,
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
