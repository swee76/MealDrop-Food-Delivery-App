import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import uuid from "react-native-uuid";
import {onValue, ref, set} from "firebase/database";
import {database} from "../../firebase";
import {useRouter} from "expo-router";
import {Entypo} from '@expo/vector-icons';

const FoodItemForm = () => {
    const router = useRouter();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [isImageSelected, setIsImageSelected] = useState(false)
    const [storeName, setStoreName] = useState('');
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

    const handleSubmit = () => {
        if (name === '' || description === '' || price === '' || category === '' || storeName === '' || !isImageSelected) {
            Alert.alert('Please fill all fields')
            return;
        } else {

            const foodItem = {
                id: uuid.v4(),
                itemName: name,
                description: description,
                pricePerItem: price,
                itemCategory: category,
                uri: image,
            }

            setName('')
            setDescription('')
            setPrice('')
            setCategory('')
            setImage(null)
            setIsImageSelected(false)

            createStore(foodItem).then(() => {
                router.push('/food-menu')
            })
        }
    }

    const createStore = async (foodItem) => {
        await set(ref(database, 'food-items/' + foodItem.id), foodItem)
    }

    const handleChooseImage = async () => {
        try {
            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
                setIsImageSelected(true)
            } else {
                setIsImageSelected(false)
            }
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.heading}>~Add Food Menu Item~</Text>
            <View style={styles.form}>
                <View style={styles.field}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Description:</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Price per item:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={price}
                        onChangeText={(text) => setPrice(text)}
                    />
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Category:</Text>
                    <Picker
                        style={styles.input}
                        selectedValue={category}
                        onValueChange={(value) => setCategory(value)}
                    >
                        <Picker.Item label="Select a category" value=""/>
                        <Picker.Item label="Appetizer" value="appetizer"/>
                        <Picker.Item label="Main Course" value="main-course"/>
                        <Picker.Item label="Dessert" value="dessert"/>
                        <Picker.Item label="Beverage" value="beverage"/>
                    </Picker>
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Select a Store:</Text>
                    <Picker
                        style={styles.input}
                        selectedValue={storeName}
                        onValueChange={(value) => setStoreName(value)}
                    >
                        <Picker.Item label="Select a store" value=""/>
                        {storeList.map((storeData) => <Picker.Item label={storeData.storeName}
                                                                   value={storeData.storeName}/>)}
                    </Picker>
                </View>
            </View>

            <View style={styles.imageContainer}>
                <TouchableOpacity style={styles.imagePicker} onPress={handleChooseImage}>
                    <Text style={styles.imageButton}>Choose image</Text>
                </TouchableOpacity>

                {isImageSelected &&
                    <View>
                        <TouchableOpacity style={{padding: 6}} onPress={() => {
                            setImage(null);
                            setIsImageSelected(!isImageSelected)
                        }}>
                            <Entypo name="cross" size={24} color="black"/>
                        </TouchableOpacity>
                        <Image source={{uri: image.toString()}} style={{width: 200, height: 100}} contentFit="contain"/>
                    </View>}

            </View>

            <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Create Food Menu Item</Text>
            </TouchableOpacity>
        </View>
    );
}

export default FoodItemForm;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 10,
        zIndex: -1
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    form: {
        marginTop: 10,
        marginBottom: 4,
        width: '90%'
    },
    field: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10
    },
    label: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 5,
    },
    input: {
        flex: 2,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        width: '90%',
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 15,
        width: "90%"
    },
    imageLabel: {
        flex: 1,
    },
    imagePicker: {
        flex: 2,
        display: 'flex',
        marginVertical: 10
    },
    imageButton: {
        fontSize: 16,
        color: 'blue'
    },
    buttonContainer: {
        width: '90%',
        backgroundColor: '#e7b8ae',
        borderRadius: 5,
    },
    buttonText: {
        padding: 10,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 16,
        color: '#fff'
    },
})