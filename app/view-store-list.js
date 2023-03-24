import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Link} from "expo-router";
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import React, {useEffect, useState} from "react";
import {onValue, ref} from "firebase/database";
import {database} from "../firebase";

const ViewStoreList = () => {
    const [storeList, setStoreList] = useState([])

    useEffect(() => {
        fetchStores().then((data) => console.log(data))
    }, [])

    const fetchStores = async (storeName) => {
        const storeInfo = ref(database, 'store/' + storeName)

        let stores;

        onValue(storeInfo, (snapshot) => {
            stores = snapshot.val()
        })

        setStoreList(stores)
    }

    const handleEditStoreDetails = (name) => {

    }

    return (
        <BasicPageWrapper>
            <View style={styles.breadcrumbContainer}>
                <Link href={'/'} style={styles.goBack}>Go Back</Link>
            </View>
            <View style={styles.container}>
                <Text style={styles.heading}>~Store List~</Text>
                {storeList && storeList.map((store) => <View key={store.storeName}> <Text>{store.storeName}</Text>
                    <Text>{store.storeLocation}</Text>
                    <Text>{store.businessHours}</Text>
                    <Text>{store.contactInfo}</Text>

                    <TouchableOpacity style={styles.buttonContainer} onPress={handleEditStoreDetails(store.storeName)}>
                        <Text style={styles.buttonText}>
                            Edit
                        </Text>
                    </TouchableOpacity></View>)}
            </View>
        </BasicPageWrapper>
    )
}

export default ViewStoreList;

const styles = StyleSheet.create({
    breadcrumbContainer: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        margin: 18,
        position: 'relative'
    },
    goBack: {
        width: '25%'
    },
    menuItemsButton: {
        width: '35%',
        backgroundColor: '#d0a852',
        borderRadius: 16,
    },
    menuItemsButtonText: {
        paddingVertical: 8,
        paddingHorizontal: 6,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 10,
    },
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