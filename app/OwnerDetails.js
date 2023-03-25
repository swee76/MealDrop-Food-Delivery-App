import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import {Link} from "expo-router";

const storeOwners = [
  {
    id: 1,
    ownerName: 'John Doe',
    storeName: 'Doe Mart',
    location: 'New York',
    isBlocked: false,
  },
  {
    id: 2,
    ownerName: 'Jane Smith',
    storeName: 'Smith Shop',
    location: 'Los Angeles',
    isBlocked: true,
  },
  {
    id: 3,
    ownerName: 'Bob Johnson',
    storeName: 'Johnson Market',
    location: 'Chicago',
    isBlocked: false,
  },
];

const OwnerDetails = ({ owner }) => {
  const [isBlocked, setIsBlocked] = useState(owner.isBlocked);

  const handleBlockPress = () => {
    setIsBlocked(!isBlocked);
  };

  return (
  
    <View style={styles.ownerContainer}>
      <Text style={styles.ownerName}>{owner.ownerName}</Text>
      <Text style={styles.storeName}>{owner.storeName}</Text>
      <Text style={styles.location}>{owner.location}</Text>
      <TouchableOpacity style={styles.button} onPress={handleBlockPress}>
        <Text style={styles.buttonText}>{isBlocked ? 'Unblock' : 'Block'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
    </View>

  );
};

const OwnerList = () => {
    const [singedIn, setSingedIn] = useState(false)
  return (
    <BasicPageWrapper singedIn={singedIn}>
        <Link href={'/adminhome'}>Go back</Link>
    <FlatList
      data={storeOwners}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <OwnerDetails owner={item} />}
    />
        </BasicPageWrapper>
  );
};

const styles = StyleSheet.create({
  ownerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  ownerName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  storeName: {
    fontSize: 16,
  },
  location: {
    fontSize: 14,
  },
  button: {
    backgroundColor: '#4287f5',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default OwnerList;