import React, { useState, useEffect} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavigationService from '../components/NavigationService.js';
import RowDia  from '../components/RowDia';
import ErrorConnexio  from '../components/ErrorConnexio';
import Colors from '../constants/Colors';
import Urls from '../constants/Urls';
import { useFetch } from "../helpers/Hooks";
import { usePoble } from "../helpers/Storage";

// array tonta per a carregar rows quan no hi han dades
const arrayLoader = [0,1,2,3,4,5,6]

const AnarAlDia = ( dia ) => {
  NavigationService.navigate('LlistatEvents', { dia });
}

export default function LlistatDiesScreen(props) {
  const [loadingPoble, poble] = usePoble();
  const [data, loading, setLoading] = useFetch(Urls.festivitat + poble.id, { nom : 'events'});

  return (
    <View style={styles.container}>
      <ScrollView
        style={[styles.container, data.dies ? { backgroundColor : data.dies.length % 2 ? Colors.llistat1 : Colors.llistat2} : null]}
        contentContainerStyle={styles.contentContainer}>
        { data.dies && data.dies.length ?
          data.dies.map(( dia, index ) => <RowDia key={dia.id} index={index} dia={dia} callback={() => AnarAlDia(dia)} />)
          : data === false && !loading ? <ErrorConnexio callback={setLoading.bind(this)}/> : arrayLoader.map((dia, index) => <RowDia key={dia} index={index}  />)
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.llistat1
  },
  contentContainer: {
    paddingTop: 0,
  },
  botoMenu : {
   flexDirection: "row",justifyContent: "flex-end",paddingRight:10, width: 120
  }
});

LlistatDiesScreen.navigationOptions = ( props ) => {
  const { poble } = props.navigation.state.params;
  return {
    title: poble.festivitat.nom,
    headerStyle: {
      backgroundColor: Colors.corporatiu,
    },
    headerTintColor: Colors.titolsPantalles,
    headerTitleStyle: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    headerRight: (
       <TouchableOpacity style={styles.botoMenu} onPress={() =>  props.navigation.openDrawer()}>
         <Ionicons name="md-menu" size={22} color={Colors.titolsPantalles} />
        </TouchableOpacity>
     )
  }
};
