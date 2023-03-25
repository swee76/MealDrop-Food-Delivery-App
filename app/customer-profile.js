import {Text, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import { Link, useRouter } from "expo-router";
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import React, {useEffect, useState} from "react";
import {ref, onValue, update} from "firebase/database";
import {database} from "../firebase";
import {getObject} from "../storage";

const CustomerProfile = () => {

    const [name, setName] = useState(null);
    const [email, setEmail] = useState('');
    const [Phone, setPhone] = useState(null);
    const [Address, setAddress] = useState(null);
    const [City, setCity] = useState(null);
    const [user, setUser] = useState(null);
    const [trigger, setTrigger] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('')

    const router = useRouter();

    useEffect(()=>{
        getObject('user').then((data)=>{
            readUser(data.id).then((user)=>{
                console.log(user)
                setEmail(user.email)
                setName(user.name)
                setPhone(user.Phone)
                setAddress(user.Address)
                setCity(user.City)
            })
        })
        //readUser()
    },[]);

    const readUser = async (userId) => {
        const userData = ref(database, 'users/' + userId,userData);
        let user;
        onValue(userData, (snapshot) => {
            user = snapshot.val();
        });
        return user;
    };


    useEffect(() => {
        getObject('user')
            .then((data) => {
                setUserId(data.id)
                readUser(data.id)
                    .then((user) => {
                        setUser(user)
                    })
            })
    }, [])
    const deleteCustomer = async () => {
        setLoading(true)

        const userData = {
            name: null,
            Phone: null,
            City: null,
            Address:null

        }


        update(ref(database, 'users/' + userId), userData)
            .then(() => {
                setTrigger(!trigger)
                setLoading(false)
                router.push('/update-customer')
            })
        alert("User Information Deleted Successfully!!");
    }

    return (
        <BasicPageWrapper>
            <View style={styles.container}>
                <Text style={styles.heading}>User Details</Text>
                <Image source={require('../assets/eat.png')}
                       style={{width: 180, height: 140, margin: 12}}/>
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
                    <Text style={styles.value}>{Phone}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Address:</Text>
                    <Text style={styles.value}>{Address}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>City:</Text>
                    <Text style={styles.value}>{City}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => {
                        router.push('/update-customer')
                    }}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.editButton]} onPress={deleteCustomer} >
                        <Text style={styles.buttonText} >Delete</Text>
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
