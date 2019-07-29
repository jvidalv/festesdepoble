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
import { useFetchFestivitat } from "../helpers/Hooks";
import { usePoble } from "../helpers/Storage";
import { useDemanarLocalitzacio } from '../helpers/PermisosLocalitzacio';
import { compartir } from '../helpers/Compartir';
import Colors from '../constants/Colors';
import Urls from '../constants/Urls';
import logoNegre from '../assets/images/fem-poble-negre.png';

export default function MapaScreen(props) {
  const [loadingPoble, poble] = usePoble();
  const [data, loading, setLoading] = useFetchFestivitat();
  // seleccionats
  useEffect(() => {
    setDiesSeleccionats(data.dies)
  }, [data])

  const [filtreDies, setFiltreDies] = useState(false);
  const [diesSeleccionats, setDiesSeleccionats] = useState([])
  const [infoMarker, setInfoMarker] = useState({event: false, visible: false});

  return (
      <View style={styles.container}>
        {loading ? <View style={styles.Loader}>
            <ActivityIndicator color="black" size="large"/>
          </View>
        : data && data.dies && data.dies.length ? <MapView
          toolbarEnabled={false}
          loadingEnabled={true}
          showsCompass={false}
          style={{flex: 1}}
          initialRegion={{ latitude: poble.latitude, longitude: poble.longitude, latitudeDelta: 0.0022, longitudeDelta: 0.0121 }}
          onPress={() => setInfoMarker({visible : false, event: false})}
        >
          { data.dies.map((dia, index) => {
            return estaSeleccionat(dia, diesSeleccionats ? diesSeleccionats : []) ?
              dia.events.map((event) => <MapView.Marker
                key={event.id}
                pinColor={colors[index]}
                stopPropagation={true}
                touchable={true}
                coordinate={{ latitude: event.latitude, longitude: event.longitude, latitudeDelta: 0.0022, longitudeDelta: 0.0121 }}
                onPress={() => setInfoMarker({visible : true, dia: dia, event: event, color: colors[index]})}/>)
              : null
          })}
        </MapView>
        : <ErrorConnexio callback={setLoading.bind(this)}/> }
        <View
          style={styles.filterContainer}
          >
          { data.dies && data.dies.length ? <View style={{flexDirection: 'row', marginTop: 5}}>
            <TouchableOpacity
               style={styles.filterText}
               onPress={() => setFiltreDies(!filtreDies)}>
              <Text style={{fontSize: 18, color: 'black', fontFamily: 'mon-bold'}}>Filtrar per dia</Text>
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
          { infoMarker.visible ? <View style={styles.infoMarker}>
            <ScrollView style={styles.infoMarkerContent}>
              <View style={[styles.contentContainer]}>
                <Text  numberOfLines={2} style={[styles.title, {color: Colors.roigos}]}>{infoMarker.event.nom}</Text>
              </View>
              <View style={[styles.contentContainer]}>
                <Text style={styles.textContent}>
                  {infoMarker.event.localitzacio}, {infoMarker.event.dia_inici} a les {infoMarker.event.hora_inici}{infoMarker.event.hora_fi ? ' fins les ' + infoMarker.event.hora_fi : ''}
                </Text>
              </View>
              <View style={[styles.contentContainer]}>
                <Text style={styles.titleContent}>Més informació</Text>
                <Text numberOfLines={2} style={styles.textContent}>{infoMarker.event.descripcio}</Text>
              </View>
            </ScrollView>
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  style={[styles.botonsEsquerra, {backgroundColor: infoMarker.color, opacity: 0.9}]}
                  onPress={() => NavigationService.navigate('LlistatEvents', { dia: infoMarker.dia })}
                  >
                  <Ionicons name="md-list" size={26} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.botonsEsquerra, {width: '15%', backgroundColor: Colors.taronjaLogo + 'E6'}]}
                  onPress={() => NavigationService.navigate('Event', {  event: infoMarker.event })}
                  >
                  <Ionicons name="md-eye" size={26} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.botoModal, {backgroundColor: Colors.roigos + 'E6'}]}
                  onPress={() => compartir(infoMarker.event)}
                  >
                  <Ionicons name="md-share" size={26} color="white" />
                </TouchableOpacity>
              </View>
            </View>
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
    right: 15, top: 10, left: 10,
    alignItems: 'flex-end', marginLeft: 30,
  },
  filterText: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    color: 'black',
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
  infoMarker : {
    position: 'absolute',
    flex: 1,
    padding: 5,
    bottom: 10,
    left: 10,
    right: 10,
  },
  infoMarkerContent : {
    backgroundColor: '#ffffffE6',
  },
  Loader : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonsRow : {
    flexDirection: 'row', marginTop: 5
  },
  botonsEsquerra : {
    width: '10%', marginRight: 5, justifyContent: 'center', alignItems: 'center'
  },
  botoMenu : {
   flexDirection: "row",justifyContent: "flex-end", paddingRight:20, width: 160
 },
   botoModal : {
     backgroundColor: '#ffffff', flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 10
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

MapaScreen.navigationOptions = (props) => {
  const { poble } = props.screenProps;
  return {
    title: poble && poble.festivitat ? poble.festivitat.nom : 'Events al mapa',
    headerBackTitle: 'Mapa',
    headerStyle: {
      backgroundColor: Colors.corporatiu,
    },
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
