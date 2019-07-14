import React, {useState, useEffect} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  ActivityIndicator
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import Urls from '../constants/Urls';

import Colors from '../constants/Colors';
import NavigationService from '../components/NavigationService.js';
import RowEsdeveniment  from '../components/RowEsdeveniment';

function enviarFormulari(setLoading, setResponse, nom, telefon, email, missatge){
  setLoading(true)
  const fetchFormulari = async () => {
    const response = await fetch(Urls.contactar, {
        method: 'POST',
        body: `nom=${nom}&telefon=${telefon}&email=${email}&missatge=${missatge}&origen=festesdepoble`
      }
    ).then((response) => response.ok ? true : false)
    setResponse(response)
    setLoading(false)
  }
  fetchFormulari()
}

export default function ContactarScreen( props ) {
  const [nom, setNom] = useState("")
  const [telefon, setTelefon] = useState("")
  const [email, setEmail] = useState("")
  const [missatge, setMissatge] = useState("")
  const [boto, setVisibilitatBoto] = useState(false)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)

  useEffect(() => {
    setVisibilitatBoto(nom !== "" && telefon !== "" && email !== "" && missatge !== "" );
  }, [nom, telefon, email, missatge]); // Solo se vuelve a ejecutar si count cambia

  return (
    <View style={styles.container}>
      { !loading && response === null ? <View style={styles.containerContent}>
        <Text style={styles.textExplicacio}>
          Trobes a faltar el teu poble? Vols sol·licitar un esdeveniment nou? Pots contactar amb nosaltres omplint el formulari:
        </Text>
          <View style={styles.form}>
            <View style={styles.formInput}>
              <Text style={styles.textInput}>
                Nom i cognom
              </Text>
              <TextInput
                onChangeText = {(text) => setNom(text)}
                autoCompleteType="name"
                style={styles.input}
              />
            </View>
            <View style={styles.formInput}>
              <Text style={styles.textInput}>
                Telèfon
              </Text>
              <TextInput
                onChangeText = {(text) => setTelefon(text)}
                autoCompleteType="tel"
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
            <View style={styles.formInput}>
              <Text style={styles.textInput}>
                Correu electrònic
              </Text>
              <TextInput
                onChangeText = {(text) => setEmail(text)}
                autoCompleteType="email"
                keyboardType="email-address"
                style={styles.input}
              />
            </View>
            <View style={styles.formInput}>
              <Text style={styles.textInput}>
                Missatge
              </Text>
              <TextInput
                onChangeText = {(text) => setMissatge(text)}
                autoCompleteType="email"
                keyboardType="email-address"
                multiline={true}
                blurOnSubmit={true}
                style={[styles.input, styles.area]}
              />
            </View>
          </View>
          { boto ? <View style={styles.botoContainer}>
            <TouchableOpacity
              style={styles.boto}
              onPress= {() => enviarFormulari(setLoading, setResponse, nom, telefon, email, missatge)}>
              <Text style={styles.botoText} >
                Enviar
              </Text>
              <Ionicons name="md-arrow-dropright-circle" size={18} color="white" />
            </TouchableOpacity>
          </View>
          : null}
      </View>
      : response === null ? <View style={styles.resultsContainer}>
        <ActivityIndicator color="white" size="large" />
      </View>
      : response ? <View style={styles.resultsContainer}>
        <Text style={{fontSize: 22, fontFamily: 'mon-black', textAlign : 'center'}}>Gràcies per participar :)</Text>
        <Text style={{fontSize: 20, fontFamily: 'mon-medium', textAlign : 'center'}}>Ens posarem en contacte el més prompte possible</Text>
      </View>
      :  <View style={styles.resultsContainer}>
          <Text style={{fontSize: 22, fontFamily: 'mon-black', textAlign : 'center'}}>Hi ha hagut un error :(</Text>
          <Text style={{fontSize: 20, fontFamily: 'mon-medium', textAlign : 'center'}}>Torna-ho a provar més tard</Text>
          <Text style={{fontSize: 18, fontFamily: 'open-sans', textAlign : 'center'}}>Disculpa les molèsties</Text>
      </View> }
      <TouchableOpacity
        style={styles.footer}
        onPress={handleVidalFun}>
        <Text style={styles.textFooter}>FemPoble Ⓡ {new Date().getFullYear()}</Text>
        <Text style={styles.textFooterBottom}>Desenvolupat per Josep Vidal, clica per saber més</Text>
      </TouchableOpacity>
    </View>
  )
}

function handleVidalFun() {
  WebBrowser.openBrowserAsync(
    'https://jvidalv.github.io/josepvidal/'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fondo
  },
  containerContent: {
    padding: 10,
  },
  textExplicacio : {
    fontSize: 16, fontFamily:'open-sans'
  },
  form : {
    marginVertical : 5
  },
  formInput: {
    flexDirection : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  textInput : {
    width: '20%', height: 40, fontFamily: 'mon-bold',
  },
  input : {
    backgroundColor: Colors.llistat1, padding: 10, flex: 1, height: 40, borderRadius: 5
  },
  area : {
    height: 90,
  },
  botoContainer : {
    flex: 1, alignItems: 'flex-end'
  },
  boto : {
    backgroundColor: Colors.corporatiu, padding: 10, height:  40, borderRadius: 5, alignSelf: 'flex-end', flexDirection : 'row'
  },
  botoText : {
    textAlign:'right', color: Colors.titolsPantalles, 'textTransform':'uppercase', marginHorizontal: 10
  },
  footer : {
    position: 'absolute', bottom:0, width: '100%', backgroundColor: Colors.corporatiu, padding: 10
  },
  textFooter : {
    textAlign: 'center', fontFamily: 'newrotic', color: 'white'
  },
  textFooterBottom : {
    textAlign: 'center', fontSize: 12, color: 'white'
  },
  botoMenu : {
   flexDirection: "row",justifyContent: "flex-end",paddingRight:10, width: 120
  },
  resultsContainer : {
    flex: 1, justifyContent: 'center', alignItems : 'center', paddingHorizontal: 20
  }
});

ContactarScreen.navigationOptions = ( props ) => {
  const { poble } = props.screenProps;
  return {
    title: 'Contactar',
    headerStyle: {
      backgroundColor: Colors.corporatiu,
    },
    headerTintColor: Colors.titolsPantalles,
    headerTitleStyle: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    headerRight: (
      poble ? <TouchableOpacity style={styles.botoMenu} onPress={() =>  props.navigation.openDrawer()}>
         <Ionicons name="md-menu" size={22} color={Colors.titolsPantalles} />
       </TouchableOpacity> : null
     )
  }
};
