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

export default function RowEsdeveniment({ event, callback }) {
  return (
    <TouchableOpacity
      style={[styles.Row, {backgroundColor: (event.id % 2 ? 'white' : 'gray')}]}
      onPress={callback}
      delayPressIn={50}
      >
      <View style={styles.ContainerLeft}>
        <Text style={styles.TextLeft}>
          {event.dia}
        </Text>
        <Text style={styles.TextLeft}>
          {event.horaInici}
        </Text>
      </View>
      <View style={styles.ContainerTextRight}>
        <Text style={styles.TextRightTop}>
          {event.nom}
        </Text>
        <Text style={styles.TextRightBottom}>
          <Ionicons name="md-pin" size={12} color="black" />
          {event.localitzacio}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  Row:{
    backgroundColor:'blue',
    paddingRight:10,
    paddingTop:10,
    paddingBottom:10,
    flexDirection: 'row',
  },
  ContainerLeft:{
    alignItems: 'flex-end',
    width: '20%',
  },
  TextLeft:{
    fontSize: 12,
    textTransform:'uppercase'
  },
  ContainerTextRight:{
    marginLeft: 10,
    flex: 1,
  },
  TextRightTop:{
    fontSize: 12,
    fontWeight: 'bold'
  },
  TextRightBottom:{
    fontSize: 12,
  }
});
