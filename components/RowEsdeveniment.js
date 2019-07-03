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
          {/* <Ionicons name="md-pin" size={12} color="black" /> */}
          {event.localitzacio}
        </Text>
      </View>
      <View style={styles.ContainerRight}>
        <Ionicons name="md-arrow-dropright-circle" size={20} color="black" />
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
  ContainerRight:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
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
