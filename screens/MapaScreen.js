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
} from 'react-native';
import MapView from 'react-native-maps';
import RowFiltre from '../components/RowFiltre';
import NavigationService from '../components/NavigationService';
import { useDemanarLocalitzacio } from '../helpers/PermisosLocalitzacio';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function MapViewModal(props) {

  // demanar Permisos
  const [demanarPermisos, localitzacioActual, localitzacioPermisos, mapRegion] = useDemanarLocalitzacio()
  useEffect(() => { demanarPermisos() }, [])

  //gestionem filtres
  const [filtreDies, setFiltreDies] = useState(false);
  const [filtreEstats, setFiltreEstats] = useState(false);
  const [diesSeleccionats, setDiesSeleccionats] = useState(dies)
  const [estatsSeleccionats, setEstatsSeleccionats] = useState(estats)

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
  // console.log(estatsSeleccionats)
  //gestionem modal visible
  const [infoMarker, setInfoMarker] = useState({event: false, visible: false});

  return (
      <View style={styles.container}>
        {
          localitzacioActual === null ?
          <View style={styles.viewEstat}>
            <Text style={styles.textEstat}>Buscant la teva situació actual...</Text>
            <ActivityIndicator size="large" color="white" />
          </View> :
          localitzacioPermisos === false ?
            <View style={styles.viewEstat}>
              <Text style={styles.textEstat}>Permisos de localització denegats.</Text>
            </View> :
            mapRegion === null ?
            <View style={styles.viewEstat}>
              <Text style={styles.textEstat}>No es possible localitzar la teva posició</Text>
            </View> :
            <View style={{flex: 1}}>
              <MapView
                toolbarEnabled={false}
                loadingEnabled={true}
                mapType="hybrid"
                style={{flex: 1, width: '100%', height: 250}}
                initialRegion={mapRegion}
                showsUserLocation={true}
                showsMyLocationButton={true}
                onPress={() => setInfoMarker({visible : false, nom: false})}
              >
                <MapView.Marker
                  touchable={true}
                  coordinate={mapRegion}
                  onPress={() => setInfoMarker({visible : !infoMarker.visible, nom: 'hola'})}
                />
              </MapView>
              <View
                style={styles.filterContainer}
                >
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                       style={styles.filterText}
                       onPress={() => setFiltreEstats(!filtreEstats)}>
                      <Text style={{fontSize: 18, color: Colors.titolsPantalles}}>Filtrar per estat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.filterIcon}
                      onPress={() => setFiltreEstats(!filtreEstats)}>
                      <Ionicons name={filtreEstats ? "md-remove" : "md-add"} size={18} color={Colors.titolsPantalles} />
                    </TouchableOpacity>
                </View>
                { filtreEstats ?
                  estats.map((estat) => (
                    <RowFiltre
                      key={estat.id}
                      nom={estat.nom}
                      item={estat}
                      items={estats}
                      seleccionat={estaSeleccionat( estat, estatsSeleccionats )}
                      seleccionats={estatsSeleccionats}
                      setSeleccionats={setEstatsSeleccionats}
                      gestionarSeleccionats={gestionarSeleccionats} />
                  ))
                  : null
                }
                <View style={{flexDirection: 'row', marginTop: 5}}>
                  <TouchableOpacity
                     style={styles.filterText}
                     onPress={() => setFiltreDies(!filtreDies)}>
                    <Text style={{fontSize: 18, color: Colors.titolsPantalles}}>Filtrar per dies</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.filterIcon}
                    onPress={() => setFiltreDies(!filtreDies)}>
                    <Ionicons name={filtreDies ? "md-remove" : "md-add"} size={18} color={Colors.titolsPantalles} />
                  </TouchableOpacity>
                </View>
                { filtreDies ?
                  dies.map((dia) => (
                    <RowFiltre
                      key={dia.id}
                      nom={dia.nomDia}
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
              { infoMarker.visible ? <View style={{position: 'absolute', bottom: 10, padding: 10, left: 10, right: 10, flex: 1,  backgroundColor: Colors.titolsPantalles + 'CC' }}>
                  <Text style={styles.title}>Espectacular a lhort de ca la tieta</Text>
                  <Text>
                    Al Ajuntament
                  </Text>
                  <Text>
                    De les 08:00 a les 12:00
                  </Text>
                  <View style={{marginTop: 10}}>
                    <Text style={styles.textBold}>
                      Més informació:
                    </Text>
                    <Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                  </View>
                </View>
                : null
              }
            </View>
        }
      </View>
    )
}

const dies = [
  {
    id: 1,
    nomDia : 'Dies',
    dataDia : 'previs'
  },
  {
    id: 2,
    nomDia : 'Dies',
    dataDia : 'previs'
  },
  {
    id: 3,
    nomDia : 'Dies',
    dataDia : 'previs'
  }
]

const estats = [
  {
    id: 1,
    nom : 'Finalitzat...',
  },
  {
    id: 2,
    nom : 'En martxa!',
  },
  {
    id: 3,
    nom: 'Proximament!!',
  }
]


const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor : Colors.fondo
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
    backgroundColor: Colors.corporatiu + 'BF',
    paddingHorizontal:5,
    justifyContent:'center', alignItems: 'center'
  },
  filterIcon: {
    backgroundColor: Colors.corporatiu + 'BF',
    marginLeft: 5,
    paddingHorizontal:5,
    justifyContent:'center', alignItems: 'center',
    minWidth: 24,
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


MapViewModal.navigationOptions = ({ navigation }) => {
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
