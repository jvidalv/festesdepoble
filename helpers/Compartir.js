import React from 'react';
import { Share, Alert, Linking, Platform } from 'react-native';

async function compartir(object){
    try {
      const result = await Share.share({
        title: object.nom,
        message: object.share + (Platform.OS !== 'ios' ? ' (https://bit.ly/2YFqLA8) 📳' : ''),
        url: Platform.OS === 'ios' ? 'https://apple.co/31m1fOj' : 'https://bit.ly/2YFqLA8',
      });

      if (result.action === Share.sharedAction) {
        // if (result.activityType) {
        //   // shared with activity type of result.activityType
        // } else {
        //   // shared
        // }
        Alert.alert("Gràcies per compartir-ho! ♥")
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
};

export { compartir};
