import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default function RowEsdeveniment(props) {
  const {event, index, callback, mostrarDia} = props;
  return (
    <TouchableOpacity
      style={[styles.Row, {backgroundColor: (index % 2 ? Colors.llistat1 : Colors.llistat2) + 'CC'}]}
      onPress={callback}
      delayPressIn={50}
      >
      <View style={[styles.ContainerLeft, event.es_dia_normal && !mostrarDia ? { width:  '12%', justifyContent: 'center', alignItems: 'center'} : {width: '20%' }]}>
        <Text numberOfLines={1} style={[styles.TextLeft, styles.TextTop]}>
          {!event.es_dia_normal || mostrarDia ? event.dia_inici : event.hora_inici}
        </Text>
        { !event.es_dia_normal || mostrarDia ? <Text style={styles.TextLeft}>
          {event.hora_inici}
        </Text> : null}
      </View>
      <View style={styles.ContainerTextRight}>
        <Text numberOfLines={3} style={styles.TextRightTop}>
          {event.nom}
        </Text>
        <View style={{flexDirection: 'row', alingItems : 'center'}}>
          <Text numberOfLines={1} style={styles.TextRightBottom}>
            {event.localitzacio}
          </Text>
        </View>
      </View>
      <View style={styles.ContainerRight}>
        <Ionicons name="md-arrow-forward" size={20} color="black" />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  Row:{
    padding: 10,
    minHeight: 70,
    flexDirection: 'row',
  },
  ContainerLeft:{
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '18%'
  },
  ContainerRight:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '6%',
  },
  TextLeft:{
    fontSize: 12,
    fontFamily: 'open-bold',
    textTransform:'uppercase'
  },
  TextTop:{
    fontFamily: 'open-bold',
    color: Colors.roigos,
    fontWeight: 'bold'
  },
  ContainerTextRight:{
    marginLeft: 10,
    justifyContent: 'center',
    flex: 1,
  },
  TextRightTop:{
    fontSize: 14,
    fontFamily: 'open-bold',
    fontWeight: 'bold'
  },
  TextRightBottom:{
    fontSize: 12,
    fontFamily: 'open-sans',
  }
});
