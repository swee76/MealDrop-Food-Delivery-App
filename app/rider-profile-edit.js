import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import {useEffect, useState} from "react";
import {onValue, ref, update} from "firebase/database";
import {database} from "../firebase";
import {getObject} from "../storage";
import {useRouter} from "expo-router";

const RiderProfileEdit = () => {
    const [user, setUser] = useState(null);

    const [userId, setUserId] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')
    const [vehicle, setVehicle] = useState('')
    const [vehicleNumber, setVehicleNumber] = useState('')

    const [loading, setLoading] = useState(false)

    const router = useRouter();

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
            setPhone(user.phone || '')
            setCity(user.city || '')
            setVehicle(user.vehicle || '')
            setVehicleNumber(user.vehicleNumber || '')
        }
    }, [user])


    const updateProfile = async () => {
        setLoading(true)

        if (name === '' || phone === '' || city === '' || vehicle === '' || vehicleNumber === '') {
            alert('Please fill all fields')
            setLoading(false)
            return
        }

        const userData = {
            name,
            phone,
            city,
            vehicle,
            vehicleNumber
        }


        update(ref(database, 'users/' + userId), userData)
            .then(() => {
                router.push('/rider-profile')
            })
    }

    return (
        <BasicPageWrapper>
            <View style={styles.subHeadingBox}>
                <Text style={styles.subHeadingText}>~ Rider Profile ~</Text>
            </View>
            <View style={styles.detailBox}>
                <Text style={styles.header}>Edit Profile</Text>

                <TextInput style={styles.inputField} value={name}
                           onChangeText={setName}
                           placeholder={'Name'}/>
                <TextInput style={styles.inputField} value={phone}
                           onChangeText={setPhone}
                           placeholder={'Phone'}/>
                <TextInput style={styles.inputField} value={city}
                           onChangeText={setCity}
                           placeholder={'City'}/>
                <TextInput style={styles.inputField} value={vehicle}
                           onChangeText={setVehicle}
                           placeholder={'Vehicle'}/>
                <TextInput style={styles.inputField} value={vehicleNumber}
                           onChangeText={setVehicleNumber}
                           placeholder={'Vehicle Number'}/>


                <TouchableOpacity
                    onPress={updateProfile}
                    style={styles.greenTouchableOpacity}>
                    <Text style={{color: '#FFF'}}>
                        {loading ? 'Saving Changes ...' : 'Save Changes'}
                    </Text>
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
    inputField: {
        borderWidth: 1,
        borderColor: '#e55259',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
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
        marginTop: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})