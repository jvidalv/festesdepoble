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
import MapViewModal from '../components/MapViewModal';
import { Ionicons } from '@expo/vector-icons';



export default function EventScreen( props ) {
  const { event } = props.navigation.state.params;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{event.nom}</Text>
        <Text>
          {event.localitzacio}
        </Text>
        <Text>
          {event.horari}
        </Text>
        <View style={{marginTop: 10}}>
          <Text style={styles.textBold}>
            Més informació:
          </Text>
          <Text>
            {event.descripcio}
          </Text>
        </View>
        <View style={{marginTop: 10, flex: 1}}>
          <Text style={styles.textBold}>
            Veure al mapa:
          </Text>
          <MapViewModal event={event}/>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer : {
    padding: 10,
  },
  contentLeft : {
    width: 80,
  },
  title : {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle : {
    fontSize: 16,
  },
  textBold : {
    fontWeight: 'bold'
  }
});

EventScreen.navigationOptions = ({ navigation }) => {
  const { event } = navigation.state.params;
  return {
    title: event.dia + ' a les ' + event.horaFinal,
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
      textTransform: 'uppercase'
    },
    headerRight: (
       <View style={{flexDirection: "row", justifyContent: "flex-end", paddingRight:10, width: 120}}>
         <Text style={[{paddingHorizontal: 5}, event.finalitzat ? {backgroundColor: 'red', color: 'white'} : {backgroundColor: 'blue', color: 'white'} ]}>
           {event.estat}
         </Text>
       </View>
     )
  }
};
