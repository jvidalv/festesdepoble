import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavigationService from '../components/NavigationService.js';
import { MonoText } from '../components/StyledText';
import RowDia  from '../components/RowDia';

const dies = [
 {
   id: 1,
   nomDia : 'Dies',
   dataDia : 'previs',
   esdeveniments : [
     {
       id : 1,
       nom : 'Espectacular a lhort de ca la tieta',
       dia : 'Agost, 24',
       horaInici : '08:00',
       horaFinal : '10:00',
       localitzacio : 'A l\'ajuntament',
       coordenades : { latitude: 41.1201096 , longitude: 0.4049346 },
       descripcio : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
       quanFalta : '2 hores',
       actiu : true,
       finalitzat : false,
       imatge : 'http://www.vilalba.altanet.org/sites/vilalba/files/styles/home_slideshow/public/article16.jpg?itok=rHteeywG',
       duracio : '2 hores',
       horari : 'De les 08:00 a les 12:00',
       estat : 'Pendent',
     },
     {
       id : 2,
       nom : 'Actuacio estelar a lajuntament de la vila amb la colaboracio estelar de papito',
       dia : 'Agost, 24',
       horaInici : '20:00',
       horaFinal : '22:00',
       localitzacio : 'A l\'ajuntament',
       coordenades : { latitude: 41.1201096 , longitude: 0.4049346 },
       descripcio : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
       quanFalta : '5 hores',
       actiu : false,
       finalitzat : false,
       imatge : 'http://www.vilalba.altanet.org/sites/vilalba/files/styles/home_slideshow/public/article16.jpg?itok=rHteeywG',
       duracio : '2 hores',
       horari : 'De les 08:00 a les 12:00',
       estat : 'Actiu',
     },
     {
       id : 3,
       nom : 'Juan Magan ens deleitara amb una actuacio historica el dia del cumpleanys de la pquita',
       dia : 'Agost, 24',
       horaInici : '23:00',
       horaFinal : '01:00',
       localitzacio : 'A l\'ajuntament',
       coordenades : { latitude: 41.1201096 , longitude: 0.4049346 },
       descripcio : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
       quanFalta : '4 hores',
       actiu : false,
       finalitzat : true,
       imatge : 'http://www.vilalba.altanet.org/sites/vilalba/files/styles/home_slideshow/public/article16.jpg?itok=rHteeywG',
       duracio : '2 hores',
       horari : 'De les 08:00 a les 12:00',
       estat : 'Finalitzat',
     },
   ]
 },
 {
   id: 2,
   nomDia: 'Dilluns',
   dataDia: '6 d\'agost'
 },
 {
   id: 3,
   nomDia: 'Dimarts',
   dataDia: '7 d\'agost'
 },
 {
   id: 4,
   nomDia: 'Dimecres',
   dataDia: '8 d\'agost'
 },
 {
   id: 5,
   nomDia: 'Dijous',
   dataDia: '9 d\'agost'
 },
 {
   id: 6,
   nomDia: 'Divendres',
   dataDia: '10 d\'agost'
 }
]

const AnarAlDia = ( dia ) => {
  NavigationService.navigate('LlistatEvents', { dia });
}

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        {dies.map( dia => <RowDia key={dia.id} dia={dia} callback={() => AnarAlDia(dia)} />)}
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <DevelopmentModeNotice />

          <Text style={styles.getStartedText}>Get started bay opening</Text>

          <View
            style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
            <MonoText>screens/HomeScreen.js</MonoText>
          </View>

          <Text style={styles.getStartedText}>
            Change this text and your app will automatically reload.
          </Text>
        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>
              Help, it didn’t automatically reload!
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>
          This is a tab bar. You can edit it in:
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <MonoText style={styles.codeHighlightText}>
            navigation/MainTabNavigator.js
          </MonoText>
        </View>
      </View> */}
    </View>
  );
}

HomeScreen.navigationOptions = ({ navigation }) => {
  // const { dia } = navigation.state.params;
  return {
    drawerLabel: 'Notifications',
    title: 'Festes majors 2019',
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
      textTransform: 'uppercase'
    },
    headerRight: (
       <View style={{flexDirection: "row",justifyContent: "flex-end",paddingRight:10, width: 120}}>
         <TouchableOpacity
            onPress={() => navigation.openDrawer()}
           >
             <Ionicons name="md-menu" size={22} color="black" />
         </TouchableOpacity>
       </View>
     )
  }
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 0,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
