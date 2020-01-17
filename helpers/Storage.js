import {useEffect, useState} from "react";
import {AsyncStorage} from 'react-native';

function usePoble() {
    const [loadingPoble, setLoading] = useState(true);
    const [poble, setPoble] = useState({})

    const storagePoble = async () => {
        const poble = await AsyncStorage.getItem('poble').then((response) => JSON.parse(response))
        setPoble(poble)
        setLoading(false)
    }

    useEffect(() => {
        storagePoble()
    }, [])

    return [loadingPoble, poble];
}

export {usePoble};
