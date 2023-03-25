import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Link} from "expo-router";
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import React, {useEffect, useState} from "react";
import {onValue, ref} from "firebase/database";
import {database} from "../firebase";
import {getObject} from "../storage";
import StoreDetailsCard from "../components/list/StoreDetailsCard";

const ViewStoreList = () => {
    const [storeList, setStoreList] = useState([])

    useEffect(() => {
        fetchStores()
    }, [])

    const fetchStores = async () => {
        const storeInfo = ref(database, 'food-store/')

        onValue(storeInfo, (snapshot) => {
            const data = snapshot.val()

            const stores = [];

            for (const key in data) {
                stores.push(data[key])
            }
            setStoreList(stores)
        })
    }

    return (
        <BasicPageWrapper>
            <View style={styles.breadcrumbContainer}>
                <Link href={'/'} style={styles.goBack}>Go Back</Link>
            </View>
            <View style={styles.container}>
                <Text style={styles.heading}>~Store List~</Text>
                <ScrollView contentContainerStyle={{maxHeight: '300%'}}>
                    {storeList.map((store, index) => <StoreDetailsCard store={store} key={index}/>)}
                </ScrollView>
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
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginHorizontal: 16,
        marginBottom: 16
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        width: '90%'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '90%',
    },
})