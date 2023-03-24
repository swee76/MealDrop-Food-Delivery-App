import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Image} from 'expo-image'
import Ionicons from '@expo/vector-icons/Ionicons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
// import firebase from 'firebase/compat';
// import 'firebase/compat/database';

const itemsList = [{
    id: 1,
    image: "https://thumbs.dreamstime.com/b/bacon-cheese-burger-beef-patty-tomato-onion-pizza-mozzarella-ham-tomatoes-salami-pepper-pepperoni-spices-fresh-basil-123768697.jpg",
    name: "burger",
    description: "Order 2 one small chip bucket is free!",
    category: 'appetizer',
    price: 1212,
    isAdded: false
}, {
    id: 21,
    image: "https://www.onmanorama.com/content/dam/mm/en/food/features/images/2021/10/17/pizza.jpg.transform/576x300/image.jpg",
    name: "pizza",
    description: "One coke bottle is free!",
    category: 'main course',
    price: 812,
    isAdded: false
}, {
    id: 31,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8XLzkU9BrEs2SLWPGXpIDXgfdzzTdngh4QA&usqp=CAU",
    name: "Foot-long",
    description: "",
    category: 'dessert',
    price: 690,
    isAdded: false
}, {
    id: 41,
    image: "https://hips.hearstapps.com/hmg-prod/images/drinks-to-avoid-1621959532.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*",
    name: "Lemon Juice",
    description: "",
    category: 'beverage',
    price: 590,
    isAdded: false
}]
const FoodMenuList = () => {
    const [menuItems, setMenuItems] = useState(itemsList);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const menuItemsRef = firebase.database().ref('menuItems');
    //         const snapshot = await menuItemsRef.once('value');
    //         const data = snapshot.val();
    //         const menuItemsArray = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
    //         setMenuItems(menuItemsArray);
    //     };
    //     fetchData();
    // }, []);

    const handleDeleteMenuItem = (itemID) => {
        // implement code here
    }

    const handleAddToCart = (itemID) => {
        // implement code here
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>~Food Menu~</Text>
            {menuItems.map((item) => <View style={styles.card} key={item.id}>
                <TouchableOpacity onPress={handleDeleteMenuItem(item.id)} style={styles.deleteButton}>
                    <MaterialCommunityIcons name="delete-circle-outline" size={32} color="red"/>
                </TouchableOpacity>

                {item.image && <Image source={{uri: item.image.toString()}} style={{width: '100%', height: 200}}/>}
                <View style={styles.headerWrapper}>
                    <Text style={styles.cardTitle}>{item.name} - </Text>
                    <Text style={styles.categoryLabel}>{item.category}</Text>
                </View>

                {item.description && <Text style={styles.cardDescription}>{item.description}</Text>}
                <View style={styles.cardFooter}>
                    <Text style={styles.cardPrice}>Rs.{item.price}</Text>
                    <TouchableOpacity onPress={handleAddToCart(item.id)}>
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
    container: {
        flex: 1,
        padding: 10,
        overflow: 'scroll'
    },
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
