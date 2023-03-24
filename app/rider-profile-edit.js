import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import {useEffect, useState} from "react";
import {onValue, ref} from "firebase/database";
import {database} from "../firebase";
import {getObject} from "../storage";

const RiderProfileEdit = () => {
    const [user, setUser] = useState(null);

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')
    const [vehicle, setVehicle] = useState('')
    const [vehicleNumber, setVehicleNumber] = useState('')
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        getObject('user')
            .then((data) => {
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
            setName(user.name)
            setPhone(user.phone)
            setCity(user.city)
            setVehicle(user.vehicle)
            setVehicleNumber(user.vehicleNumber)
        }
    }, [user])

    return (
        <BasicPageWrapper>
            <View style={styles.subHeadingBox}>
                <Text style={styles.subHeadingText}>Rider Profile</Text>
            </View>
            <View style={styles.detailBox}>
                <Text style={styles.header}>Profile</Text>

                <Text style={styles.detailText}>Name: {name}</Text>
                <Text style={styles.detailText}>Phone: {phone}</Text>
                <Text style={styles.detailText}>City: {city}</Text>
                <Text style={styles.detailText}>Vehicle: {vehicle}</Text>
                <Text style={styles.detailText}>Vehicle Number: {vehicleNumber}</Text>

                <TouchableOpacity style={styles.greenTouchableOpacity}>
                    <Text style={{color: '#FFF'}}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
        </BasicPageWrapper>
    )
}

export default RiderProfileEdit;

const styles = StyleSheet.create({
    subHeadingBox: {
        backgroundColor: '#e55259',
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subHeadingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
    },
    detailBox: {
        backgroundColor: '#FFF',
        margin: 40,
        padding: 20,
        paddingHorizontal: 40,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    detailText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    greenTouchableOpacity: {
        marginHorizontal: 20,
        backgroundColor: '#e55259',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})