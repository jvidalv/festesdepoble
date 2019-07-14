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
  const {event, index, callback} = props;
  return (
    <TouchableOpacity
      style={[styles.Row, {backgroundColor: (index % 2 ? Colors.llistat1 : Colors.llistat2)}]}
      onPress={callback}
      delayPressIn={50}
      >
      <View style={[styles.ContainerLeft, { width: event.es_dia_normal ? '12%' : '20%'}]}>
        <Text numberOfLines={1} style={[styles.TextLeft, styles.TextTop]}>
          {!event.es_dia_normal ? event.dia_inici : event.hora_inici}
        </Text>
        { !event.es_dia_normal ? <Text style={styles.TextLeft}>
          {event.hora_inici}
        </Text> : null}
      </View>
      <View style={styles.ContainerTextRight}>
        <Text style={styles.TextRightTop}>
          {event.nom}
        </Text>
        <View style={{flexDirection: 'row', alingItems : 'center'}}>
          <Text style={styles.TextRightBottom}>
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
    width: '20%'
  },
  ContainerRight:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '6%',
  },
  TextLeft:{
    fontSize: 12,
    fontFamily: 'open-sans',
    textTransform:'uppercase'
  },
  TextTop:{
    fontFamily: 'open-sans',
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
    fontFamily: 'open-sans',
    fontWeight: 'bold'
  },
  TextRightBottom:{
    fontSize: 12,
    fontFamily: 'open-sans',
  }
});
