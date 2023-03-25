import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import {useEffect, useState} from "react";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {ref, update} from "firebase/database";
import {database} from "../firebase";
import {useNavigation} from "expo-router";
import {getRoutes} from "expo-router/src/getRoutes";

const StoreDetailsEdit = ({store}) => {
    const navigation = useNavigation()
    const [newStoreName, setNewStoreName] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [newBusinessHours, setNewBusinessHours] = useState('');
    const [newContactInfo, setNewContactInfo] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        console.log(getRoutes())
        //    implement code here
    }, [])

    // const handleEditStoreDetails = async () => {
    //     if (store.storeName === '' || store.location === '' || store.businessHours === '' || store.contactInfo === '') {
    //         alert('Please fill all fields')
    //         return
    //     }
    //
    //     const storeData = {
    //         id: store.id,
    //         storeName: newStoreName,
    //         location: newLocation,
    //         businessHours: newBusinessHours,
    //         contactInfo: newContactInfo,
    //     }
    //
    //     update(ref(database, 'food-store/' + storeData.id), storeData).then(() => {
    //         Alert.alert("Updated Successfully")
    //     })
    // }

    return (
        <BasicPageWrapper>
            <View key={store.id} style={styles.container}>
                <View style={styles.headerWrapper}>
                    <Text style={styles.title}>{store.storeName}</Text>
                    <TouchableOpacity onPress={handleDeleteMenuItem(store.id)} style={styles.deleteButton}>
                        <MaterialCommunityIcons name="delete-circle-outline" size={32} color="red"/>
                    </TouchableOpacity>
                </View>

                <View style={styles.field}>
                    <Text>{'\u2022'} Store Location:</Text>
                    <TextInput style={styles.data} value={store.storeLocation}
                               onChangeText={(text) => setNewLocation(text)} editable={isEditMode}/>
                </View>
                <View style={styles.field}>
                    <Text>{'\u2022'} Business Hours:</Text>
                    <TextInput style={styles.data} value={store.businessHours}
                               onChangeText={(text) => setNewBusinessHours(text)} editable={isEditMode}/>
                </View>
                <View style={styles.field}>
                    <Text>{'\u2022'} Contact Info:</Text>
                    <TextInput style={styles.data} value={store.contactInfo}
                               onChangeText={(text) => setNewContactInfo(text)}/>
                </View>

                <TouchableOpacity style={styles.buttonContainer} onPress={handleEditStoreDetails}>
                    <Text style={styles.buttonText}>
                        Save
                    </Text>
                </TouchableOpacity></View>
        </BasicPageWrapper>
    )
}

export default StoreDetailsEdit;

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        position: 'relative',
        width: '90%',
        backgroundColor: '#f1ede7',
        padding: 8,
        elevation: 2,
        borderRadius: 6,
    },
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    field: {
        flexDirection: 'row',
        marginVertical: 6
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    data: {
        color: '#938e8e',
        marginLeft: 10
    },
    buttonContainer: {
        width: '100%',
        backgroundColor: '#e7b8ae',
        borderRadius: 5,
        marginVertical: 10
    },
    buttonText: {
        padding: 10,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 16,
        color: '#fff'
    },
})