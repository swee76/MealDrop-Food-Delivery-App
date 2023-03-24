import {Text, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import { Link, useRouter } from "expo-router";
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import React, {useEffect, useState} from "react";
import { ref, onValue} from "firebase/database";
import {database} from "../firebase";
import {getObject} from "../storage";

const CustomerProfile = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    const [Address, setAddress] = useState('');
    const [City, setCity] = useState('');

    const router = useRouter();

    useEffect(()=>{
        getObject('user').then((data)=>{
            readUser(data.id).then((user)=>{
                console.log(user)
              //  setName(user.name)
                setEmail(user.email)
            })
        })
        //readUser()
    },[]);

    const readUser = async (userId) => {
        const userData = ref(database, 'users/' + userId);
        let user;
        onValue(userData, (snapshot) => {
            user = snapshot.val();
        });
        return user;
    };

    return (
        <BasicPageWrapper>
            <View style={styles.container}>
                <Text style={styles.heading}>User Details</Text>
                <Image source={require('../assets/landing-home-phone-new.png')}
                       style={{width: 200, height: 160, margin: 12}}/>
                <View style={styles.row}>
                    <Text style={styles.label} >Name:</Text>
                    <Text style={styles.value} >{name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{email}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Phone:</Text>
                    <Text style={styles.value}>(123) 456-7890</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Address:</Text>
                    <Text style={styles.value}>123 Main St.</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>City:</Text>
                    <Text style={styles.value}>Anytown</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => {
                        router.push('/update-customer')
                    }}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        router.push('/')
                    }}>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BasicPageWrapper>
    )
}

export default CustomerProfile;

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        flex: 2,
        fontWeight: 'bold',
        marginRight: 10,
        fontSize:20
    },
    value: {
        flex: 3,
        fontSize:20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#FF5A5F',
        borderRadius: 4,
        paddingHorizontal: 20,
        paddingVertical: 10,
        minWidth: 100,
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
});
