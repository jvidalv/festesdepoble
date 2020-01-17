import React, {useState} from 'react';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

// Funcio que que demana permisos de localitzacio
// Retorne si te permisos, la regio actual, i una posicio per al mapa centrat a lusuari
export const useDemanarLocalitzacio = () => {
    const [localitzacioActual, setlocalitzacioActual] = useState(null);
    const [localitzacioPermisos, setlocalitzacioPermisos] = useState(null);
    const [mapRegion, setMapRegion] = useState(null);

    const demanarPermisos = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            setlocalitzacioPermisos('Permisos denegats')
        } else {
            setlocalitzacioPermisos(true)
        }
        let location = await Location.getCurrentPositionAsync({});
        setlocalitzacioActual(JSON.stringify(location))
        setMapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0121
        });
    }

    return [demanarPermisos, localitzacioActual, localitzacioPermisos, mapRegion]
}
