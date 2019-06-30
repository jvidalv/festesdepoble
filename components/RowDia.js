import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function RowDia({ dia, callback }) {
  return (
    <TouchableOpacity
      style={[styles.Row, {backgroundColor: (dia.id % 2 ? 'white' : 'gray')}]}
      onPress={callback}
      delayPressIn={50}
      >
      <View>
        <Text style={styles.TextLeft}>
          {dia.nomDia}
        </Text>
        <Text style={styles.TextLeft}>
          {dia.dataDia}
        </Text>
      </View>
      <View style={styles.ContainerTextRight}>
        <Text style={styles.TextRightTop}>
          Esdeveniments
        </Text>
        <Text style={styles.TextRightBottom}>
          66
        </Text>
      </View>
    </TouchableOpacity>
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
