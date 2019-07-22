import React, { useState, useEffect} from 'react';
import { AsyncStorage } from 'react-native';
import NavigationService from '../components/NavigationService.js';

function useDesconectar(loading, data) {
  if(loading && data === null){
    const canviarPoble = () => {
      const eliminarDades = async () => await AsyncStorage.multiRemove(['poble', 'events'])
      eliminarDades()
      NavigationService.navigate('AuthLoading');
    }
    canviarPoble();
  }
}

export { useDesconectar }
