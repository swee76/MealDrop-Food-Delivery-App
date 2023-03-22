import {Text, View, TextInput, StyleSheet, TouchableOpacity, Image} from "react-native";
import React, {useState, useEffect} from 'react';
// import firebase from 'firebase';

const StoreDetailsForm = () => {
    const [storeName, setStoreName] = useState('');
    const [location, setLocation] = useState('');
    const [businessHours, setBusinessHours] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);


    // useEffect(() => {
    //     const user = firebase.auth().currentUser;
    //     firebase.firestore().collection('stores').doc(user.uid).get()
    //         .then((doc) => {
    //             if (doc.exists) {
    //                 const {storeName, location, businessHours, contactInfo} = doc.data();
    //                 setStoreName(storeName);
    //                 setLocation(location);
    //                 setBusinessHours(businessHours);
    //                 setContactInfo(contactInfo);
    //             } else {
    //                 console.log('No store details found for current user.');
    //             }
    //         })
    //         .catch((error) => {
    //             console.log('Error fetching store details: ', error);
    //         });
    // }, []);
    //
    // const handleEditModeToggle = () => {
    //     setIsEditMode(!isEditMode);
    // };
    //
    // const handleSubmit = () => {
    //     const user = firebase.auth().currentUser;
    //     firebase.firestore().collection('stores').doc(user.uid).set({
    //         storeName,
    //         location,
    //         businessHours,
    //         contactInfo,
    //     })
    //         .then(() => {
    //             console.log('Store details saved successfully!');
    //             setIsEditMode(false);
    //         })
    //         .catch((error) => {
    //             console.log('Error saving store details: ', error);
    //         });
    // };

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.heading}>~Store Details~</Text>
                <Image source={require('../../assets/landing-home-phone-new.png')}
                       style={{width: 200, height: 200, margin: 12}}/>
                <TextInput
                    style={styles.input}
                    placeholder="Store Name"
                    value={storeName}
                    onChangeText={setStoreName}
                    editable={isEditMode}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Location"
                    value={location}
                    onChangeText={setLocation}
                    editable={isEditMode}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Business Hours"
                    value={businessHours}
                    onChangeText={setBusinessHours}
                    editable={isEditMode}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contact Information"
                    value={contactInfo}
                    onChangeText={setContactInfo}
                    editable={isEditMode}
                />

                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>
                        {isEditMode ? 'Save' : 'Edit'}
                    </Text>
                </TouchableOpacity>

                {/*     onPress={handleSubmit}*/}
                {/*    onPress={handleEditModeToggle}*/}
            </View>
        </View>
    )
}

export default StoreDetailsForm;


const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 16
        },
        heading: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
        }
        ,
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
        },
        buttonText: {
            padding: 10,
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 16,
        },
    })
;