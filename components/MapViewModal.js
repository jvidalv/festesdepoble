import React, {useState, useEffect} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView from 'react-native-maps';
import { useDemanarLocalitzacio } from '../helpers/PermisosLocalitzacio';

export default function MapaScreen() {

  // demanar Permisos
  const [demanarPermisos, localitzacioActual, localitzacioPermisos, mapRegion] = useDemanarLocalitzacio()
  useEffect(() => { demanarPermisos() }, [])

  return (
    <View style={{flex: 1}}>
      {
        localitzacioActual === null ?
        <View>
          <Text>Buscant la teva situació actual...</Text>
        </View> :
          localitzacioPermisos === false ?
          <View><Text>Permisos de localització denegats.</Text></View> :
            mapRegion === null ?
            <View><Text>No es possible localitzar la teva posició</Text></View> :
            <MapView
              toolbarEnabled={false}
              loadingEnabled={true}
              mapType="hybrid"
              style={{flex: 1, width: '100%', height: 250}}
              initialRegion={mapRegion}
              showsUserLocation={true}
              showsMyLocationButton={true}
            >
              <MapView.Marker
                coordinate={mapRegion}
              />
            </MapView>
      }
    </View>
  )
}
