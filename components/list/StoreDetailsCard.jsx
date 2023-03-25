import {Text, TouchableOpacity, View, StyleSheet, Alert, TextInput} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import {onValue, ref, update} from "firebase/database";
import {database} from "../../firebase";

const StoreDetailsCard = ({store}) => {
    const [newLocation, setNewLocation] = useState('');
    const [newBusinessHours, setNewBusinessHours] = useState('');
    const [newContactInfo, setNewContactInfo] = useState('');

    const [isEditMode, setIsEditMode] = useState(false);

    const handleDelete = async () => {
        const storeData = {
            storeName: null,
            storeLocation: null,
            businessHours: null,
            contactInfo: null,
        }

        update(ref(database, 'food-store/' + store.id), storeData)
            .then(() => {
                Alert.alert("Deleted Successfully")
            }).catch((err) => {
            Alert.alert('Store delete Failed')
        })

    }

    const handleEdit = async () => {
        if (isEditMode) {
            if (newLocation === '' || newBusinessHours === '' || newContactInfo === '') {
                Alert.alert("Please set all the fields")
                return
            }

            const storeData = {
                storeLocation: newLocation,
                businessHours: newBusinessHours,
                contactInfo: newContactInfo,
            }

            update(ref(database, 'food-store/' + store.id), storeData)
                .then(() => {
                    setIsEditMode(false)
                    Alert.alert('Store updated Successfully')
                })
                .catch((err) => {
                    Alert.alert('Store update Failed')
                })
        } else {
            setIsEditMode(true)
        }
    }

    return (
        <View key={store.id} style={styles.container}>
            <View style={styles.headerWrapper}>
                <Text style={styles.title}>{store.storeName}</Text>
                <TouchableOpacity onPress={() => handleDelete} style={styles.deleteButton}>
                    <MaterialCommunityIcons name="delete-circle-outline" size={32} color="red"/>
                </TouchableOpacity>
            </View>

            <View style={styles.field}>
                <Text>{'\u2022'} Store Location:</Text>
                <View style={{
                    width: '60%',
                    paddingRight: 10,
                    marginLeft: 10,
                }}>
                    {isEditMode ? <TextInput
                            placeholder={store.storeLocation || 'Location'}
                            style={styles.input} value={newLocation}
                            onChangeText={setNewLocation}/> :
                        <Text style={styles.field}>{store.storeLocation}</Text>
                    }
                </View>
            </View>

            <View style={styles.field}>
                <Text>{'\u2022'} Business Hours:</Text>
                <View style={{
                    width: '60%',
                    paddingRight: 10,
                    marginLeft: 10,
                }}>
                    {isEditMode ? <TextInput
                            placeholder={store.businessHours || 'Business Hours'}
                            style={styles.input} value={newBusinessHours}
                            onChangeText={setNewBusinessHours}/> :
                        <Text style={styles.field}>{store.businessHours}</Text>
                    }
                </View>
            </View>

            <View style={styles.field}>
                <Text>{'\u2022'} Contact Info:</Text>
                <View style={{
                    width: '60%',
                    paddingRight: 10,
                    marginLeft: 10,
                }}>
                    {isEditMode ? <TextInput
                            placeholder={store.contactInfo || 'Contact Info'}
                            style={styles.input} value={newContactInfo}
                            onChangeText={setNewContactInfo}/> :
                        <Text style={styles.field}>{store.contactInfo}</Text>
                    }
                </View>
            </View>

            <TouchableOpacity style={styles.buttonContainer} onPress={handleEdit}>
                <Text style={styles.buttonText}>
                    {isEditMode ? 'Save' : 'Edit'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default StoreDetailsCard;

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 18,
        marginBottom: 10,
    },
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