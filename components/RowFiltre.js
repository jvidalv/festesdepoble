import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function RowFiltre( props ) {
  const { item, nom, seleccionat, seleccionats, gestionarSeleccionats, setSeleccionats, bgcolor } = props
  return (
    <View style={[styles.Row, { opacity: (seleccionat ? 1 : 0.6) }]}>
      <TouchableOpacity
        style={{backgroundColor: bgcolor}}
        key={item.id}
        onPress={() => setSeleccionats( gestionarSeleccionats( item, seleccionats ))}>
          <Text style={styles.Text} numberOfLines={1}> {nom} </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.Icon, {backgroundColor: bgcolor}]}
        onPress={ () => setSeleccionats( gestionarSeleccionats( item, seleccionats ))}>
        <Ionicons name={ seleccionat ? "md-eye" : "md-eye-off"} size={18} color={Colors.titolsPantalles} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  Row:{
    flexDirection: 'row', marginTop: 5, alignSelf: 'flex-end',
  },
  Text:{
    fontSize: 18, color: Colors.titolsPantalles
  },
  Icon:{
    minWidth: 24,
    marginLeft: 5,
    paddingHorizontal:5,
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 30,
  },
});
