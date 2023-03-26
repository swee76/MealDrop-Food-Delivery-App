import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import {useState} from "react";
import {StyleSheet, Text, View, Alert} from "react-native";
import {Link} from "expo-router";
import {child, get, getDatabase, ref} from "firebase/database";

const orderHistory = () => {
    const [ordersHistory, setOrdersHistory] = useState();
    const [singedIn, setSingedIn] = useState(false)

    const dbRef = ref(getDatabase());
    get(child(dbRef, `orders`)).then((snapshot) => {
        if (snapshot.exists()) {
            setOrdersHistory(snapshot.val())
        } else {
            Alert.alert("No data available");
        }
    }).catch((error) => {
        Alert.alert("Order history fetch failed");
        console.error(error);
    });


    const handleFunction = () => {
        //   implement code here
    }

    return (
        <BasicPageWrapper singedIn={singedIn}>
            <Link href={'/admin-home'}>Go back</Link>
            <View style={styles.container}>
                <Text style={styles.header}>Order History</Text>
                <View>
                    {ordersHistory && Object.keys(ordersHistory).map((orderId) => (
                        <View key={orderId} style={styles.orderContainer}>
                            <Text style={styles.restaurant}>{orderId}</Text>
                            <Text style={styles.total}>Customer: {ordersHistory[orderId].cus_name}</Text>
                            <Text style={styles.total}>Items:</Text>
                            {ordersHistory[orderId]?.items?.map((item, index) => (
                                <Text key={index} style={styles.total}>
                                    {item?.food_name} x {item?.quantity}
                                </Text>
                            ))}
                            <Text style={styles.total}>Price: {ordersHistory[orderId]?.price}</Text>
                            <Text style={styles.date}>Time: {ordersHistory[orderId]?.time}</Text>
                        </View>
                    ))}
                </View>
            </View>

        </BasicPageWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f2f2f2',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    orderContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
    },
    restaurant: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    total: {
        fontSize: 16,
        marginBottom: 5,
    },
    date: {
        fontSize: 14,
        color: '#666',
    },
});


export default orderHistory;