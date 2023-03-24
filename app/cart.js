import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";

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
            <View style={styles.container}>
                <Text style={styles.title}>Food Item</Text>
                <Text style={styles.price}>${price.toFixed(2)}</Text>
                <View style={styles.quantityContainer}>
                    <Button title="-" onPress={() => setQuantity(Math.max(quantity - 1, 1))} />
                    <Text style={styles.quantity}>{quantity}</Text>
                    <Button title="+" onPress={() => setQuantity(quantity + 1)} />
                </View>
                <Button title="Add to Cart" onPress={addToCart} />
                <Text style={styles.cartTitle}>Cart</Text>
                {cart.map((item, index) => (
                    <Text key={index} style={styles.cartItem}>${item.price.toFixed(2)}</Text>
                ))}
                <Button title="Clear Cart" onPress={clearCart} />
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
});

export default Cart;
