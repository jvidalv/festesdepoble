import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

// TODO : FICAR ELS ESTILS ABAIX CORRECTAMENT
// TODO : Explicar que espere la funcio i que retorne
export default function RowFiltre( props ) {
  const { item, items, nom, seleccionat, seleccionats, gestionarSeleccionats, setSeleccionats } = props
  return (
    <View style={{flexDirection: 'row', marginTop: 5, alignSelf: 'flex-end'}}>
      <TouchableOpacity
        style={{backgroundColor: ( seleccionat ? Colors.llistat1 : Colors.llistat2) + 'CC'}}
        key={item.id}
        onPress={() => setSeleccionats( gestionarSeleccionats( item, seleccionats )) }
      >
          <Text style={{fontSize: 18, color: Colors.titolsPantalles}}> {nom} </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          minWidth: 24,
          backgroundColor: ( seleccionat ? Colors.llistat1 : Colors.llistat2) + 'CC',
          marginLeft: 5,
          paddingHorizontal:5,
          justifyContent:'center', alignItems: 'center'}}
        onPress={ () => setSeleccionats( gestionarSeleccionats( item, seleccionats ))}
        >
        <Ionicons name={ seleccionat ? "md-eye" : "md-eye-off"} size={18} color={Colors.titolsPantalles} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  Row:{
    minHeight:120,
    backgroundColor:'blue', padding:20, flexDirection: 'row',
  },
  TextLeft:{
    fontSize: 26,
    textTransform:'uppercase'
  },
  ContainerTextRight:{
    marginLeft: 'auto', justifyContent:'center'
  },
  TextRightTop:{
    fontSize: 12,
  },
  TextRightBottom:{
    fontSize: 16,
    textTransform:'uppercase',
    textAlign:'right'
  }
});
