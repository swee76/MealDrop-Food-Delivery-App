import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, StyleSheet} from 'react-native';
// import image from "react-native-web/src/exports/Image";
// import {auth} from 'firebase';
// import firebase from "firebase/compat";

const FoodItemForm = () => {
    // {navigation} -prop
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);

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
    // const handleChooseImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });
    //
    //     if (!result.cancelled) {
    //         setImageUri(result.uri);
    //     }
    // };


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
                    <TextInput
                        style={styles.input}
                        value={category}
                        onChangeText={(text) => setCategory(text)}
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.imagePicker}>
                {/*onPress={handleChooseImage}*/}
                <Text style={styles.imageButton}>Choose Image</Text>
            </TouchableOpacity>

            {image && (
                <View style={{marginBottom: 8}}>
                    <Text style={{fontSize: 16}}>{image.name}</Text>
                </View>
            )}

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
        marginVertical: 16
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    form: {
        marginVertical: 10,
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
    imagePicker: {
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
    },
})