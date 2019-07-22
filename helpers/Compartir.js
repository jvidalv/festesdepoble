import React from 'react';
import { Share, Alert, Linking } from 'react-native';

async function compartir(object){
    try {
      const result = await Share.share({
        title: object.nom,
        message: object.share,
        url: 'www.vidal.fun',
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
