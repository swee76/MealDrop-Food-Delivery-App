import {Text, TouchableOpacity, View, StyleSheet, Alert, TextInput} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {useState} from "react";
import {onValue, ref, update} from "firebase/database";
import {database} from "../../firebase";

const StoreDetailsCard = ({store}) => {
    const [newStoreName, setNewStoreName] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [newBusinessHours, setNewBusinessHours] = useState('');
    const [newContactInfo, setNewContactInfo] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);

    const handleEditStoreDetails = async (id) => {
        if (store.storeName === '' || store.location === '' || store.businessHours === '' || store.contactInfo === '') {
            alert('Please fill all fields')
            return
        }

        setIsEditMode(prevState => !prevState)
        const storeData = {
            id: store.id,
            storeName: newStoreName,
            location: newLocation,
            businessHours: newBusinessHours,
            contactInfo: newContactInfo,
        }

        update(ref(database, 'food-store/' + id), storeData).then(() => {
            Alert.alert("Updated Successfully")
        })
    }

    const handleDeleteMenuItem = async (id) => {
        const storeData = {
            id: null,
            storeName: null,
            location: null,
            businessHours: null,
            contactInfo: null,
        }


        update(ref(database, 'food-store/' + id), storeData)
            .then(() => {
                Alert.alert("Deleted Successfully")
            })

    }

    return (
        <View key={store.id} style={styles.container}>
            <View style={styles.headerWrapper}>
                <Text style={styles.title}>{store.storeName}</Text>
                <TouchableOpacity onPress={() => handleDeleteMenuItem(store.id)} style={styles.deleteButton}>
                    <MaterialCommunityIcons name="delete-circle-outline" size={32} color="red"/>
                </TouchableOpacity>
            </View>

            <View style={styles.field}>
                <Text>{'\u2022'} Store Location:</Text>
                <TextInput style={styles.data} value={isEditMode ? newLocation : store.storeLocation}
                           onChangeText={(text) => setNewLocation(text)} editable={isEditMode}/>
            </View>
            <View style={styles.field}>
                <Text>{'\u2022'} Business Hours:</Text>
                <TextInput style={styles.data} value={isEditMode ? newBusinessHours : store.businessHours}
                           onChangeText={(text) => setNewBusinessHours(text)} editable={isEditMode}/>
            </View>
            <View style={styles.field}>
                <Text>{'\u2022'} Contact Info:</Text>
                <TextInput style={styles.data} value={isEditMode ? newContactInfo : store.contactInfo}
                           onChangeText={(text) => setNewContactInfo(text)} editable={isEditMode}/>
            </View>

            <TouchableOpacity style={styles.buttonContainer} onPress={() => handleEditStoreDetails(store.id)}>
                <Text style={styles.buttonText}>
                    {isEditMode ? 'Save' : 'Edit'}
                </Text>
            </TouchableOpacity></View>
        // onPress={handleEditStoreDetails}
    )
}

export default StoreDetailsCard;

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
        alignItems: 'center',
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