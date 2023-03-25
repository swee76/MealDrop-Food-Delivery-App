import React, { useState } from 'react';
import {View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Link, useRouter } from "expo-router";
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";

const CustomerMenu = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Mexican Food', price: 10 },
    { id: '2', name: 'Eat and Meat', price: 20 },
    { id: '3', name: 'Pizza Pit', price: 30 },
    { id: '4', name: 'Thai Tanic', price: 40 },
    { id: '5', name: 'Fry Nation', price: 50 },
    { id: '6', name: 'Diner On Sixth', price: 30 },
    { id: '7', name: 'Green Cabin', price: 40 },
    { id: '8', name: 'Coffee Bean', price: 50 },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const handleSearch = () => {
    const filtered = cartItems.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  return (
      <BasicPageWrapper>
        <Image source={require('../assets/food-display.jpeg')}
               style={{width: 350, height: 160, margin: 12}}/>
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search items"
        value={searchQuery}
        onChangeText={(query) => setSearchQuery(query)}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={filteredItems.length > 0 ? filteredItems : cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={() => {
        router.push('/')
      }}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
      </BasicPageWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
  },
});

export default CustomerMenu ;
