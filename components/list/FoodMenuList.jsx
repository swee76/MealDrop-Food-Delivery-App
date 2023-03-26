import React, {useEffect, useState} from 'react';
import {Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {onValue, ref} from "firebase/database";
import {database} from "../../firebase";

const FoodMenuList = () => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetchMenuItems()
    }, []);

    const fetchMenuItems = async () => {
        const foodItemInfo = ref(database, 'food-items/')

        onValue(foodItemInfo, snapshot => {
            const data = snapshot.val()

            const foodItems = [];

            for (const key in data) {
                foodItems.push(data[key])
            }
            setMenuItems(foodItems)
        })
    }

    const handleDeleteMenuItem = async (itemId) => {
        const menuItemData = {
            id: null,
            description: null,
            itemCategory: null,
            itemName: null,
            pricePerItem: null,
            uri: null,
        }

        delete (ref(database, 'food-store/' + itemId), menuItemData)
            .then(() => {
                Alert.alert("Deleted Successfully")
            }).catch((err) => {
                Alert.alert('Store delete Failed')
            })
    }

    const handleAddToCart = (itemID) => {
        // implement code here
    }

    return (
        <ScrollView contentContainerStyle={{flexGrow: 0}}>
            <Text style={styles.heading}>~Food Menu~</Text>
            {menuItems.map((item) => <View style={styles.card} key={item.id}>
                <TouchableOpacity onPress={() => handleDeleteMenuItem(item.id)} style={styles.deleteButton}>
                    <MaterialCommunityIcons name="delete-circle-outline" size={32} color="red"/>
                </TouchableOpacity>

                {item.uri && <Image source={{uri: item.uri.toString()}} style={{width: '100%', height: 200}}/>}
                <View style={styles.headerWrapper}>
                    <Text style={styles.cardTitle}>{item.itemName} - </Text>
                    <Text style={styles.categoryLabel}>{item.itemCategory}</Text>
                </View>

                {item.description && <Text style={styles.cardDescription}>{item.description}</Text>}
                <View style={styles.cardFooter}>
                    <Text style={styles.cardPrice}>Rs.{item.pricePerItem}</Text>
                    <TouchableOpacity onPress={handleAddToCart}>
                        {item.isAdded && item.id ? <Ionicons name="md-cart" size={32} color="#FF5A5F"/> :
                            <Ionicons name="md-cart-outline" size={32} color="#FF5A5F"/>}
                    </TouchableOpacity>
                </View>

            </View>)}
        </ScrollView>
    );
};

export default FoodMenuList;

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     padding: 10,
    // },
    headerWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    heading: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    categoryLabel: {
        color: 'green',
        textTransform: 'lowercase'
    },
    card: {
        backgroundColor: '#f3eef3',
        marginVertical: 10,
        padding: 6,
        elevation: 4,
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#000000'
    },
    cardImage: {
        width: 100,
        marginRight: 10,
        borderRadius: 5,
    },
    cardDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    cardTitle: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
        textTransform: 'capitalize'
    },
    cardDescription: {
        color: '#867676',
        fontSize: 14,
        marginBottom: 5,
        textTransform: 'capitalize'
    },
    cardFooter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardPrice: {
        fontSize: 14,
        color: '#777',
        padding: 4,
        backgroundColor: '#e7b8ae',
        borderRadius: 8,
        maxWidth: '25%',
        textAlign: 'center'
    },
    deleteButton: {
        display: 'flex',
        marginLeft: 'auto',
        padding: 6
    }
});
