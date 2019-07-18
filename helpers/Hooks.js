import { useState, useEffect } from "react";
import { AsyncStorage } from 'react-native';
import Urls from '../constants/Urls';

// fetch general
function useFetch(url, storer = {}) {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  const fetchUrl = async () => {
    const response = await fetch(url)
    .then((response) => response.ok ? response.json() : false)
    .catch((error) => false)
    // guardem a memoria local
    if(storer.nom) AsyncStorage.setItem(storer.nom, JSON.stringify(response))
    setData(response);
    setLoading(false);
  }

  useEffect(() => {
    if(!data){
      fetchUrl();
    }
  }, [loading]);

  return [data, loading,setLoading];
}

// fetch poble
function useFetchPoble(poble){
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  const fetchUrl = async () => {
    const response = await fetch(Urls.festivitat + poble.id)
    .then((response) => response.ok ? response.json() : false)
    .catch((error) => false)
    // guardem a memoria local
    AsyncStorage.setItem('events', JSON.stringify(response))
    setData(response);
    setLoading(false);
  }

  useEffect(() => {
    if(poble.id && data === false){
      fetchUrl();
    }
  }, [loading, poble]);

  return [data, loading, setLoading];
}

export { useFetch, useFetchPoble };
