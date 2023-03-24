import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import {Link} from "expo-router";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const Cart = () => {
    const [price, setPrice] = useState(10);
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]);

    const addToCart = () => {
        const item = { price: price * quantity };
        setCart([...cart, item]);
        alert(`Added ${quantity} item(s) to cart!`);
    };

    const clearCart = () => {
        setCart([]);
        setQuantity(1);
        alert("Cart cleared!");
    };

    return (
        <BasicPageWrapper>
            <Link href={'/'} style={styles.goBack}>Go Back</Link>
            <View style={styles.container}>
                <Text style={styles.title}>Food Item</Text>

                <Text style={styles.price}>${price.toFixed(2)}</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => setQuantity(Math.max(quantity - 1, 1))}>
                        <Icon name="remove-circle-outline" size={36} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{quantity}</Text>
                    <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                        <Icon name="add-circle-outline" size={36} color="black" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={addToCart}>
                <Text style={styles.cartTitle}>Add Cart</Text></TouchableOpacity>
                {cart.map((item, index) => (
                    <Text key={index} style={styles.cartItem}>${item.price.toFixed(2)}</Text>
                ))}
                <TouchableOpacity style={styles.button} onPress={clearCart}>
                    <Text style={styles.cartTitle}>Clear Cart</Text></TouchableOpacity>

            </View>
        </BasicPageWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    price: {
        fontSize: 24,
        marginBottom: 20,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    quantity: {
        fontSize: 24,
        marginHorizontal: 10,
    },
    cartTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cartItem: {
        fontSize: 20,
        marginBottom: 5,
        marginTop:5
    },
    button: {
        backgroundColor: '#FF5A5F',
        borderRadius: 2,
        paddingHorizontal: 20,
        paddingVertical: 10,
        minWidth: 100,
        marginTop:10
    },
});

export default Cart;
