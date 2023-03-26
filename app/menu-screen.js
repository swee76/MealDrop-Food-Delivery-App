import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import {Link} from "expo-router";
import {getDatabase, ref, child, get, set} from "firebase/database";

const menuScreen = () => {
    const [singedIn, setSingedIn] = useState(false);
    const [selectedStore, setSelectedStore] = useState();
    const [selectedItem, setSelectedItem] = useState(null);
    const [menuList, setMenuList] = useState();

    const [storesList, setStoresList] = useState();

    useEffect(() => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `stores`)).then((snapshot) => {
            if (snapshot.exists()) {
                const unblockedStores = Object.entries(snapshot.val())
                    .filter(([key, value]) => !value.isBlocked)
                    .map(([key, value]) => ({key, storeName: value.storeName}));
                setStoresList(unblockedStores)
            } else {
                Alert.alert("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

        get(child(dbRef, `menues`)).then((snapshot) => {
            if (snapshot.exists()) {
                setMenuList(snapshot.val())
            } else {
                Alert.alert("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    const handleStoreSelect = (store) => {
        setSelectedStore(store);
        setSelectedItem(null);
    };

    const handleEditItem = (item) => {
        setSelectedItem(item);
    };

    const handleCancel = () => {
        setSelectedItem(null);
    };

    const handleSaveItem = () => {
        const dbRef = ref(getDatabase());
        if (selectedItem && selectedStore) {
            set(child(dbRef, `menues/${selectedStore}/${selectedItem.key}`), selectedItem)
                .then(() => {
                    Alert.alert("Item saved successfully.");
                    setSelectedItem(null);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    return (
        <BasicPageWrapper singedIn={singedIn}>
            <Link href={'/admin-home'}>Go back</Link>
            <View style={styles.container}>
                <Text style={styles.itemName}>Choose a store</Text>
                {storesList?.map((store) => (
                    <TouchableOpacity
                        key={store.key}
                        style={[styles.menuItem, selectedStore === store.key ? styles.selected : null]}
                        onPress={() => handleStoreSelect(store.key)}
                    >
                        <Text style={styles.itemName}>{store.storeName}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {selectedStore && (
                <View style={styles.container}>
                    {menuList && Object.values(menuList[selectedStore]).map((item) => (
                        <View
                            key={item.key}
                            style={[styles.menuItem, selectedItem === item ? styles.selected : null]}
                        >
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPrice}>{item.price}</Text>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => handleEditItem(item)}
                            >
                                <Text style={styles.editButtonText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            )}
            {selectedItem && (
                <View style={styles.editModal}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Item</Text>
                        <TextInput
                            style={styles.itemNameInput}
                            value={selectedItem && selectedItem.name}
                            onChangeText={(text) => setSelectedItem({...selectedItem, name: text})}
                        />
                        <TextInput
                            style={styles.itemPriceInput}
                            value={selectedItem && selectedItem.price && selectedItem.price.toString()}
                            onChangeText={(text) => setSelectedItem({...selectedItem, price: text})}
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={handleSaveItem}>
                            <Text style={styles.saveButtonText}>Save Changes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
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
    editModal: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemNameInput: {
        height: 40,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    itemPriceInput: {
        height: 40,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    saveButton: {
        backgroundColor: '#4285f4',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default menuScreen;