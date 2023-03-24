import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key , value) => {
    try {
        await AsyncStorage.setItem(`@${key}`, value)
    } catch (e) {
        // saving error
    }
}

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(`@${key}`)
        if (value !== null) {
            // value previously stored
            return value
        }
    } catch (e) {
        // error reading value
    }
}

export const storeObject = async (key , value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(`@${key}`, jsonValue)
    } catch (e) {
        // saving error
    }
}

export const getObject = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(`@${key}`)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        // error reading value
    }
}