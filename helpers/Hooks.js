import { useState, useEffect } from "react";
import { AsyncStorage } from 'react-native';

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

export { useFetch };
