import {StyleSheet, Text, View} from 'react-native';
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import {useEffect, useState} from "react";
import {onValue, ref} from "firebase/database";
import {database} from "../firebase";
import {getObject} from "../storage";
import {useRouter} from "expo-router";

const RiderProfile = () => {
    const router = useRouter();

    const [user, setUser] = useState(null);

    const [city, setCity] = useState('')


    useEffect(() => {
        getObject('user')
            .then((data) => {
                readUser(data.id)
                    .then((data) => {
                        setUser(data)
                        getStoresNearMe()
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
            setCity(user.city)
        }
    }, [user])

    const [stores, setStores] = useState([])
    const getStoresNearMe = async () => {
        const storesNearMe = ref(database, 'store/');

        onValue(storesNearMe, (snapshot) => {
            const data = snapshot.val();

            const stores = []

            for (const key in data) {
                if (data[key].storeLocation.toLowerCase() === city.toLowerCase()) {
                    stores.push(data[key])
                }
            }

            setStores(stores)
        })
    }


    useEffect(() => {
        console.log(stores)
    }, [stores])

    return (
        <BasicPageWrapper>
            <View style={styles.subHeadingBox}>
                <Text style={styles.subHeadingText}>~ Rider Profile ~</Text>
            </View>
            <View style={styles.detailBox}>
                <Text style={styles.header}>Stores Near Me</Text>
                <Text style={{
                    ...styles.subHeader,
                    paddingTop: 0,
                    marginTop: 0,
                }}>{city}</Text>


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

    },
    subHeader: {
        fontSize: 20,
        fontWeight: '500',
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