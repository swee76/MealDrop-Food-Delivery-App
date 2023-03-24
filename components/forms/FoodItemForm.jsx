import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
// import {auth} from 'firebase';
// import firebase from "firebase/compat";

const FoodItemForm = () => {
    // {navigation} -prop
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [isImageSelected, setIsImageSelected] = useState(false)


    // const handleSubmit = async () => {
    //     try {
    //         const user = auth.currentUser;
    //         const {uid} = user;
    //         const db = firebase.firestore();
    //         const storageRef = firebase.storage().ref();
    //         const imageRef = storageRef.child(`images/${uid}/${image.name}`);
    //         await imageRef.put(image);
    //         const imageUrl = await imageRef.getDownloadURL();
    //         await db.collection('foodMenuItems').add({
    //             name,
    //             description,
    //             price,
    //             category,
    //             imageUrl,
    //             ownerId: uid,
    //         });
    //         Alert.alert('Success', 'Food menu item created successfully');
    //         navigation.goBack();
    //     } catch (error) {
    //         Alert.alert('Error', error.message);
    //     }
    // };
    //
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

            console.log(result);

            if (!result.canceled) {
                setImage(result.assets[0].uri);
                setIsImageSelected(true)
                console.log(isImageSelected)
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
            </View>

            <View style={styles.imageContainer}>
                <TouchableOpacity style={styles.imagePicker} onPress={handleChooseImage}>
                    <Text style={styles.imageButton}>Choose image</Text>
                </TouchableOpacity>
                {image &&
                    <Image source={{uri: image.toString()}} style={{width: 200, height: 200}} contentFit="contain"/>}

            </View>

            <TouchableOpacity style={styles.buttonContainer}>
                {/*onpress={handleSubmit}*/}
                <Text style={styles.buttonText}>Create Food Menu Item</Text>
            </TouchableOpacity>
        </View>
    );
}

export default FoodItemForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
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
        color:'#fff'
    },
})