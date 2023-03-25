import React, { useState } from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import {useRouter} from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';

const Cart = () => {
    const [price, setPrice] = useState(10);
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]);
    const router = useRouter();

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
            <View>
                <Text style={styles.title}>                 Food Cart</Text>
                <Image source={require('../assets/cart.png')}
                       style={{width: 250, height: 200, margin: 20, marginLeft:20,resizeMode: 'contain'}}/>
                <View style={styles.btnm}>
                    <Text style={styles.price}>${price.toFixed(2)}</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={() => setQuantity(Math.max(quantity - 1,1))}>
                            <MaterialIcons name="remove" size={24} color="black"/>
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{quantity}</Text>
                        <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                            <MaterialIcons name="add" size={24} color="black"/>
                        </TouchableOpacity>
                    </View>
                </View>

                    <TouchableOpacity style={[styles.buttonx, styles.editButton]} onPress={addToCart}>
                        <Text style={styles.buttonText}>Add Cart</Text>
                    </TouchableOpacity>
                <Text style={styles.cartTitle}>                          Cart Items</Text>
                {cart.map((item, index) => (
                    <Text key={index} style={styles.cartItem}>${item.price.toFixed(2)}</Text>
                ))}
                <View style={styles.btn}><TouchableOpacity style={[styles.button, styles.editButton]} onPress={clearCart}>
                    <Text style={styles.buttonText}>Clear Cart</Text>
                </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        router.push('/')
                    }}>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity></View>
            </View>
        </BasicPageWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        alignContent:'center'
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
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    cartItem: {
        fontSize: 20,
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#FF5A5F',
        borderRadius: 4,
        paddingHorizontal: 20,
        paddingVertical: 10,
        minWidth: 100,
    },
    buttonx: {
        backgroundColor: '#FF5A5F',
        borderRadius: 4,
        paddingHorizontal: 20,
        paddingVertical: 10,
        minWidth: 100,
        marginLeft:20
    },
    editButton: {
        backgroundColor: '#d0a852',
        marginRight: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    btn:{
        flexDirection:'row',
        marginLeft:70

    },
    btnm:{

        flexDirection:'row',
        justifyContent:'space-evenly',

    },
    new:{
        justifyContent:'space-evenly',
    }

});

export default Cart;
