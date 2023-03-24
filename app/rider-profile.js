import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import {useEffect, useState} from "react";
import {onValue, ref} from "firebase/database";
import {database} from "../firebase";
import {getObject} from "../storage";
import {useRouter} from "expo-router";

const RiderProfile = () => {
    const router = useRouter();

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
                <Text style={styles.subHeadingText}>~ Rider Profile ~</Text>
            </View>
            <View style={styles.detailBox}>
                <Text style={styles.header}>Profile</Text>

                <View style={styles.detailRow}>
                    <Text style={styles.detailTextTopic}>Name:</Text>
                    <Text style={styles.detailText}>{name || 'not set'}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailTextTopic}>Phone:</Text>
                    <Text style={styles.detailText}>{phone || 'not set'}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailTextTopic}>City:</Text>
                    <Text style={styles.detailText}>{city || 'not set'}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailTextTopic}>Vehicle:</Text>
                    <Text style={styles.detailText}>{vehicle || 'not set'}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailTextTopic}>Vehicle Number:</Text>
                    <Text style={styles.detailText}>{vehicleNumber || 'not set'}</Text>
                </View>

                <TouchableOpacity style={styles.greenTouchableOpacity}
                                  onPress={() => {
                                      router.push('/rider-profile-edit')
                                  }}>
                    <Text style={{color: '#FFF', fontWeight: "bold"}}>Edit Profile</Text>
                </TouchableOpacity>

            </View>
        </BasicPageWrapper>
    )
}

export default RiderProfile;

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
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    detailRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 11,
    },
    detailTextTopic: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    detailText: {
        fontSize: 16,
        color: '#000',
    },
    greenTouchableOpacity: {
        marginTop: 50,
        marginHorizontal: 20,
        backgroundColor: '#e55259',
        padding: 10,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})