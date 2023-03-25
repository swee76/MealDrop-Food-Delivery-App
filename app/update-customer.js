import {Text, TouchableOpacity, View, StyleSheet, TextInput, Image} from 'react-native';
import {Link, useRouter} from "expo-router";
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import React, {useEffect, useState} from "react";
import {onValue, ref, update} from "firebase/database";
import {database} from "../firebase";
import {getObject} from "../storage";

const UpadateCustomer = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState('')

    const [name, setName] = useState('');
    const [Phone, setPhone] = useState('');
    const [Address, setAddress] = useState('');
    const [City, setCity] = useState('');

    useEffect(() => {
        getObject('user')
            .then((data) => {
                setUserId(data.id)
                readUser(data.id)
                    .then((data) => {
                        setUser(data)
                    })
            })
    }, [])

    const readUser = async (userId) => {
        const userData = ref(database, 'users/' + userId);

        let user

        onValue(userData, (snapshot) => {
            user = snapshot.val()
        })

        return user
    }

    useEffect(() => {
        if (user) {
            setName(user.name || '')
            setPhone(user.Phone || '')
            setAddress(user.Address||'')
            setCity(user.City || '')
        }
    }, [user])
    const updateUser = async () => {

        if (name === '' || Phone === '' || Address ==='' || City === '') {
            alert('Please fill all fields')
            return
        }
        const userData = {
            name,
            Phone,
            Address,
            City,

        }
        update(ref(database, 'users/' + userId), userData)
            .then(() => {
                router.push('/customer-profile')
            })
        alert("User Information Updated Successfully!!");
    }


    return (
        <BasicPageWrapper>
            <View>
                <View>
                    <View style={{alignItems: 'center'}}><Text style={styles.text}>Update Customer Profile</Text></View>
                    <View style={styles.imageContainer}><Image source={require('../assets/customer-profile.jpeg')}
                              style={{width: 200, height: 160, margin: 12, alignItems: 'center',}}/></View>
                    <View style={styles.container}><TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />
                        <TextInput
                            style={styles.input}
                            placeholder="phone"
                            value={Phone}
                            onChangeText={setPhone}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Address"
                            value={Address}
                            onChangeText={setAddress}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="City"
                            value={City}
                            onChangeText={setCity}
                        />
                        <View style={styles.buttonc}>
                        <TouchableOpacity style={styles.button} onPress={updateUser}>
                            <Text style={styles.buttonText} >Save</Text>
                            </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            router.push('/customer-profile')
                        }}>
                            <Text style={styles.buttonText}>Back</Text>
                        </TouchableOpacity></View>
                    </View>
                </View>
            </View>
        </BasicPageWrapper>
    )
}

export default UpadateCustomer;

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        alignContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 16,
    },
    menuItemsButton: {
        width: '30%',
        backgroundColor: '#d0a852',
        borderRadius: 16,
    },
    edit: {
        width: '15%',
        color:'red'
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    button: {
        backgroundColor: '#FF5A5F',
        borderRadius: 4,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
        alignContent:'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonc: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageContainer: {
        alignItems: 'center',
    },
    
});
