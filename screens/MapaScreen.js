import React, {useState, useEffect} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import MapView from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import RowFiltre from '../components/RowFiltre';
import NavigationService from '../components/NavigationService';
import ErrorConnexio  from '../components/ErrorConnexio';
import { useFetchPoble } from "../helpers/Hooks";
import { usePoble } from "../helpers/Storage";
import { useDemanarLocalitzacio } from '../helpers/PermisosLocalitzacio';
import Colors from '../constants/Colors';
import Urls from '../constants/Urls';

export default function MapaScreen(props) {
  const [loadingPoble, poble] = usePoble();
  const [data, loading, setLoading] = useFetchPoble(poble);

  useEffect(() => {
    setDiesSeleccionats(data.dies)
  }, [data])

  const [filtreDies, setFiltreDies] = useState(false);
  const [diesSeleccionats, setDiesSeleccionats] = useState([])
  const [infoMarker, setInfoMarker] = useState({event: false, visible: false});

  return (
      <View style={styles.container}>
        { data.dies && data.dies.length ? <MapView
          toolbarEnabled={false}
          loadingEnabled={true}
          style={{flex: 1}}
          initialRegion={{ latitude: poble.latitude, longitude: poble.longitude, latitudeDelta: 0.0022, longitudeDelta: 0.0121 }}
          onPress={() => setInfoMarker({visible : false, event: false})}
        >
          { data.dies.map((dia, index) => {
            return estaSeleccionat(dia, diesSeleccionats ? diesSeleccionats : []) ?
              dia.events.map((event) => <MapView.Marker
                key={event.id}
                pinColor={colors[index]}
                touchable={true}
                coordinate={{ latitude: event.latitude, longitude: event.longitude, latitudeDelta: 0.0022, longitudeDelta: 0.0121 }}
                onPress={() => setInfoMarker({visible : true, event: event})}/>)
              : null
          })}
        </MapView> : data === false && !loading ? <ErrorConnexio callback={setLoading.bind(this)}/>
          : <View style={styles.Loader}>
              <ActivityIndicator color="black" size="large"/>
            </View>
        }
        <View
          style={styles.filterContainer}
          >
          { data.dies && data.dies.length ? <View style={{flexDirection: 'row', marginTop: 5}}>
            <TouchableOpacity
               style={styles.filterText}
               onPress={() => setFiltreDies(!filtreDies)}>
              <Text style={{fontSize: 18, color: Colors.titolsPantalles}}>Filtrar per dia</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterIcon}
              onPress={() => setFiltreDies(!filtreDies)}>
              <Ionicons name={filtreDies ? "md-remove" : "md-add"} size={18} color={Colors.titolsPantalles} />
            </TouchableOpacity>
          </View> : null }
          { filtreDies && data.dies && data.dies.length?
              data.dies.map((dia, index, dies) => (
                <RowFiltre
                  bgcolor={colors[index]}
                  key={dia.id}
                  nom={dia.nom_especial ? dia.nom_especial : dia.noms.nom}
                  item={dia}
                  items={dies}
                  seleccionat={estaSeleccionat( dia, diesSeleccionats )}
                  seleccionats={diesSeleccionats}
                  setSeleccionats={setDiesSeleccionats}
                  gestionarSeleccionats={gestionarSeleccionats} />
              ))
              : null
          }
          </View>
          { infoMarker.visible ? <ScrollView style={styles.infoMarkerContent}>
              <View style={[styles.contentContainer]}>
                <Text style={[styles.title, {color: Colors.roigos}]}>{infoMarker.event.nom}</Text>
              </View>
              <View style={[styles.contentContainer]}>
                <Text style={styles.titleContent}>Localització</Text>
                <Text style={styles.textContent}>
                  {infoMarker.event.localitzacio}
                </Text>
              </View>
              <View style={[styles.contentContainer]}>
                <Text style={styles.titleContent}>Horaris</Text>
                <Text style={styles.textContent}>
                  {infoMarker.event.dia_inici} a les {infoMarker.event.hora_inici}{infoMarker.event.hora_fi ? ' fins les ' + infoMarker.event.hora_fi : ''}
                </Text>
              </View>
              <View style={[styles.contentContainer]}>
                <Text style={styles.titleContent}>Més informació</Text>
                <Text style={styles.textContent}>{infoMarker.event.descripcio}</Text>
              </View>
              <View style={[styles.contentContainer]}>
                <Text style={styles.titleContent}>Organitzador</Text>
                <Text style={styles.textContent}>{infoMarker.event.organitzador}</Text>
              </View>
            </ScrollView>
            : null }
            { infoMarker.visible ? <ScrollView style={styles.infoMarkerContent}>
                <View style={[styles.contentContainer]}>
                  <Text style={[styles.title, {color: Colors.roigos}]}>{infoMarker.event.nom}</Text>
                </View>
                <View style={[styles.contentContainer]}>
                  <Text style={styles.titleContent}>Localització</Text>
                  <Text style={styles.textContent}>
                    {infoMarker.event.localitzacio}
                  </Text>
                </View>
                <View style={[styles.contentContainer]}>
                  <Text style={styles.titleContent}>Horaris</Text>
                  <Text style={styles.textContent}>
                    {infoMarker.event.dia_inici} a les {infoMarker.event.hora_inici}{infoMarker.event.hora_fi ? ' fins les ' + infoMarker.event.hora_fi : ''}
                  </Text>
                </View>
                <View style={[styles.contentContainer]}>
                  <Text style={styles.titleContent}>Més informació</Text>
                  <Text style={styles.textContent}>{infoMarker.event.descripcio}</Text>
                </View>
                <View style={[styles.contentContainer]}>
                  <Text style={styles.titleContent}>Organitzador</Text>
                  <Text style={styles.textContent}>{infoMarker.event.organitzador}</Text>
                </View>
              </ScrollView>
              : null }
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : '#f2f1f0'
  },
  viewEstat : {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  textEstat : {
    fontSize: 23, fontWeight: 'bold', marginVertical: 15, color: 'white'
  },
  filterContainer : {
    position:'absolute',
    right: 10, top: 10,
    alignItems: 'flex-end'
  },
  filterText: {
    flexDirection: 'row',
    backgroundColor: Colors.corporatiu,
    paddingHorizontal: 5,
    fontFamily: 'open-sans',
    justifyContent:'center',
    alignItems: 'center',
  },
  filterIcon: {
    backgroundColor: Colors.corporatiu,
    marginLeft: 5,
    paddingHorizontal:5,
    justifyContent:'center', alignItems: 'center',
    minWidth: 24,
    borderRadius: 30
  },
  textBold : {
    fontWeight: 'bold'
  },
  contentContainer : {
    padding: 10,
    paddingVertical : 5,
  },
  title : {
    fontSize: 16,
    fontFamily: 'mon-bold',
  },
  titleContent : {
    marginBottom: 3,
    fontFamily : 'mon-bold'
  },
  textContent : {
    fontFamily: 'open-sans',
    fontSize: 14,
  },
  infoMarkerContent : {
    position: 'absolute',
    flex: 1,
    padding: 5,
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: Colors.titolsPantalles + 'CC'
  },
  Loader : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

});

const estaSeleccionat = (sel, llistat) => {
  return llistat.findIndex((aSel) => aSel.id === sel.id ) != -1
}

const gestionarSeleccionats = (sel, llistat) => {
  const selections = [...llistat];
  if(estaSeleccionat(sel, selections)){
    return selections.filter((aSel) => aSel.id !== sel.id)
  } else {
    selections.push(sel)
    return selections;
  }
}

const colors = ['violet', 'green', 'blue', 'gold', 'red', 'indigo', 'orange', 'tan', 'linen',  'blue', 'yellow', 'teal',  'tomato']

MapaScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Mapa',
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
