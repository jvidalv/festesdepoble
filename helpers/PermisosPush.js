import {AsyncStorage} from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Urls from '../constants/Urls';

// Demanen permisos per enviar notificacions
// TIPOS -> POBLE i FESTIVITAT
// dades objecte en lo q vulguem
export async function registerForPushNotificationsAsync(tipo = 'POBLE', dades = {}) {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  if(tipo === 'POBLE'){
    return fetch(Urls.poble_push, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token:  token,
        tipo: 0,
      }),
    });
  } else { // tipo festivitat, recuperem festivitat i la guardem
    return fetch(Urls.festivitat_push, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token:  token,
        festivitat_id: dades.festivitat_id,
      }),
    });
  }
}
