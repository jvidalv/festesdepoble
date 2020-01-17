import React from 'react';
import {StyleSheet, View,} from 'react-native';
import MapView from 'react-native-maps';

export default function MapaScreen(props) {
    const {event} = props

    return (
        <View style={styles.container}>
            {
                <MapView
                    toolbarEnabled={false}
                    loadingEnabled={true}
                    style={styles.mapView}
                    initialRegion={{
                        latitude: event.latitude,
                        longitude: event.longitude,
                        latitudeDelta: 0.0022,
                        longitudeDelta: 0.0121
                    }}
                >
                    <MapView.Marker
                        coordinate={{
                            latitude: event.latitude,
                            longitude: event.longitude,
                            latitudeDelta: 0.0022,
                            longitudeDelta: 0.0121
                        }}
                    />
                </MapView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 200,
        marginTop: 5,
        justifyContent: 'center',
        overflow: 'hidden',
        alignItems: 'center',
        backgroundColor: '#f2f1f0',
        borderRadius: 10
    },
    mapView: {
        flex: 1, width: '100%', height: 200, backgroundColor: '#9d8b79', borderRadius: 10
    }
});
