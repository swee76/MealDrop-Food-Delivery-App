import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import {Link} from "expo-router";
import { getDatabase, ref, child, get } from "firebase/database";

const foodMenu = [
  { name: 'Burger', price: 5.99 },
  { name: 'Pizza', price: 8.99 },
  { name: 'Fries', price: 2.99 },
  { name: 'Salad', price: 4.99 },
];

const menuScreen = () => {
  const [menuItems, setMenuItems] = useState(foodMenu);
  const [singedIn, setSingedIn] = useState(false)
  const [select, setSelect] = useState()

  const [storesList , setStoresList] = useState();
  const [menuList , setMenuList] = useState();
  const [storeIds , setStoreIds] = useState()

  useEffect(() => {
    if(select){
      const keys = Object.keys(menuList[select]);
      setStoreIds(keys)
    }
    
  }, [select])
  

  const dbRef = ref(getDatabase());
  get(child(dbRef, `stores`)).then((snapshot) => {
    if (snapshot.exists()) {
     
      const unblockedStores = Object.entries(snapshot.val())
  .filter(([key, value]) => !value.isBlocked)
  .map(([key, value]) => ({ key, storeName: value.storeName }));
  setStoresList(unblockedStores)
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

  get(child(dbRef, `menues`)).then((snapshot) => {
    if (snapshot.exists()) {
      setMenuList(snapshot.val())
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  const handleSelect = (index) => {
    setSelect(index);
  };
 
  const handleEdit = (index) => {
    console.log(index)
    setSelect(index);
  };

  return (
    <BasicPageWrapper singedIn={singedIn}>
         <Link href={'/AdminHome'}>Go back</Link>
         <View style={styles.container}>
         <Text style={styles.itemName}>Choose a store</Text>
      {storesList?.map((item, index) => (
        <View key={index} style={styles.menuItem}>
          <Text style={styles.itemName}>{item.storeName}</Text>
       
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleSelect(item["key"])}
          >
            <Text style={styles.editButtonText}>Select</Text>
          </TouchableOpacity>
        </View>
      ))}   
   
    </View>


    <View style={styles.container}>
      {storeIds?.map((key) => (
        <View key={key} style={styles.menuItem}>
          <Text style={styles.itemName}>{menuList && menuList[select][key]["name"]}</Text>
          <Text style={styles.itemPrice}>{menuList && menuList[select][key]["price"]}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEdit(key)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
    </BasicPageWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  itemName: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#4285f4',
    borderRadius: 5,
    padding: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default menuScreen;