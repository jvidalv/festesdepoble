import { useState, useEffect } from "react";
import { AsyncStorage } from 'react-native';
import Urls from '../constants/Urls';

// fetch general
function useFetchPoble() {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  const fetchUrl = async () => {
    const response = await fetch(Urls.pobles)
    .then((response) => response.ok ? response.json() : null )
    .then(response => response)
    .catch((error) => false)
    setData(response);
    setLoading(false);

  }

  useEffect(() => {
    if(loading) fetchUrl();
  }, [loading]);

  return [data, loading, setLoading];
}

// recuperar festivitat en tots los events, has de passar un objecte poble
function useFetchFestivitat(){
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  const fetchUrl = async () => {
    const poble = await AsyncStorage.getItem('poble').then((response) => JSON.parse(response))
    const response = await fetch(Urls.festivitat + poble.id)
    .then((response) => {
      if(response.ok) {
        return response.json();
      }
      else throw new Error(response.status);
    })
    .then((response) => {
      AsyncStorage.setItem('events', JSON.stringify(response))
      return response
    })
    .catch( async (error) => {
        const response = await AsyncStorage.getItem('events').then((response) => JSON.parse(response))
        return response;
    })
    setData(response)
    setLoading(false)
  }

  useEffect(() => {
    if(loading) fetchUrl();
  }, [loading]);

  return [data, loading, setLoading];
}

export { useFetchPoble, useFetchFestivitat };
