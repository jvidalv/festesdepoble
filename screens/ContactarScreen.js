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
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import NavigationService from '../components/NavigationService.js';
import RowEsdeveniment  from '../components/RowEsdeveniment';

export default function ContactarScreen( props ) {
  const [nom, setNom] = useState("")
  const [telefon, setTelefon] = useState("")
  const [email, setEmail] = useState("")
  const [missatge, setMissatge] = useState("")
  const [boto, setVisibilitatBoto] = useState(false)

  useEffect(() => {
    setVisibilitatBoto(nom !== "" && telefon !== "" && email !== "" && missatge !== "" );
  }, [nom, telefon, email, missatge]); // Solo se vuelve a ejecutar si count cambia

  return (
    <View style={styles.container}>
      <View style={styles.containerContent}>
        <Text style={{fontSize: 16}}>
          Si-us plau, omple els següents camps del formulari i en breus ens posarem en contacte amb vostés:
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
        {boto ? <View style={styles.botoContainer}>
          <TouchableOpacity
            style={styles.boto}
            >
            <Text style={styles.botoText} >
              Enviar
            </Text>
            <Ionicons name="md-arrow-dropright-circle" size={18} color="white" />
          </TouchableOpacity>
        </View>
          : null}
      </View>
      <TouchableOpacity
        style={styles.footer}
        onPress={handleVidalFun}
      >
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Festes de Poble © 2019 </Text>
          <Text style={{textAlign: 'center', fontSize: 12}}>Desenvolupat per Josep Vidal, clica per saber més</Text>
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
  },
  containerContent: {
    padding: 10,
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
    width: '20%', height: 40, fontWeight: 'bold'
  },
  input : {
    backgroundColor: Colors.llistat1, padding: 10, flex: 1, height: 40, borderRadius: 5
  },
  area : {
    height: 70,
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
    position: 'absolute', bottom:0, width: '100%', backgroundColor: Colors.llistat2, padding: 10
  }
});

// TODO: AFEGIR BOTO DE MENU SI TENS UN POBLE GUARDAT

ContactarScreen.navigationOptions = () => {
  return {
    title: 'Contactar',
    headerStyle: {
      backgroundColor: Colors.corporatiu,
    },
    headerTintColor: Colors.titolsPantalles,
    headerTitleStyle: {
      fontWeight: 'bold',
      textTransform: 'uppercase'
    },
  }
};
