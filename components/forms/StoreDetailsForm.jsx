import {Text, View, TextInput, StyleSheet, TouchableOpacity, Image, Alert} from "react-native";
import React, {useState} from 'react';
import {database} from "../../firebase";
import {ref, set} from "firebase/database";
import {useRouter} from "expo-router";
import uuid from 'react-native-uuid';


const StoreDetailsForm = () => {
    const router = useRouter();

    const [storeName, setStoreName] = useState('');
    const [location, setLocation] = useState('');
    const [businessHours, setBusinessHours] = useState('');
    const [contactInfo, setContactInfo] = useState('');

    const handleSubmit = () => {
        const storeInfo = {
            id: uuid.v4(),
            storeName: storeName,
            storeLocation: location,
            businessHours: businessHours,
            contactInfo: contactInfo,
            foodItems: []
        }
        setStoreName('')
        setLocation('')
        setBusinessHours('')
        setContactInfo('')

        createStore(storeInfo).then(() => {
            // Alert.alert("Store added successfully");
            router.push('/view-store-list')
        }).catch((error) => {
            console.error(error)
        })

    };

    const createStore = async (storeInfo) => {
        await set(ref(database, 'food-store/' + storeInfo.id), storeInfo)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>~Store Details~</Text>
            <Image source={require('../../assets/landing-home-phone-new.png')}
                   style={{width: 200, height: 160, margin: 12}}/>

            <TextInput
                style={styles.input}
                placeholder="Store Name"
                value={storeName}
                onChangeText={setStoreName}
            />
            <TextInput
                style={styles.input}
                placeholder="Location"
                value={location}
                onChangeText={setLocation}
            />
            <TextInput
                style={styles.input}
                placeholder="Business Hours"
                value={businessHours}
                onChangeText={setBusinessHours}
            />
            <TextInput
                style={styles.input}
                placeholder="Contact Information"
                value={contactInfo}
                onChangeText={setContactInfo}
            />

            <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
                <Text style={styles.buttonText}>
                    Save
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default StoreDetailsForm;


const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 16,
            position: 'relative',
        },
        heading: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
        },
        input: {
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            width: '90%',
        },
        buttonContainer: {
            width: '90%',
            backgroundColor: '#e7b8ae',
            borderRadius: 5,
            marginVertical: 10,
        },
        buttonText: {
            padding: 10,
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 16,
            color: '#fff'
        },
    })
;