import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

const Storage = {

    getItem: async function (key) {
        let item = await AsyncStorage.getItem(key);
        return JSON.parse(item);
    },
    setItem: async function (key, value) {
        return await AsyncStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: async function (key) {
        return await AsyncStorage.removeItem(key);
    }
};
export default Storage;