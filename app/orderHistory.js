import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import {signInWithEmailAndPassword} from "firebase/auth";
import {useEffect, useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {auth} from "../firebase";
import {useRouter} from "expo-router";
import {Link} from "expo-router";
import { database } from "../firebase";
import { getDatabase, ref, child, get } from "firebase/database";

const orderHistory = () => {
  const [ordersHistory , setOrdersHistory] = useState();
  const [email, setEmail] = useState()
  const [singedIn, setSingedIn] = useState(false)
  const router = useRouter();
 
    // const orders = [
    //     { id: 1, restaurant: 'Burger King', total: '$25.00', date: 'March 1, 2023' },
    //     { id: 2, restaurant: 'Pizza Hut', total: '$30.00', date: 'February 28, 2023' },
    //     { id: 3, restaurant: 'Taco Bell', total: '$15.00', date: 'February 27, 2023' },
    //   ];

      const dbRef = ref(getDatabase());
      get(child(dbRef, `orders`)).then((snapshot) => {
        if (snapshot.exists()) {
          setOrdersHistory(snapshot.val())
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
  
   

    const handleFunction = () => {
      
    }

    return (
        <BasicPageWrapper singedIn={singedIn}>
            <Link href={'/adminhome'}>Go back</Link>
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
      {/* {orders.map((order) => (
        <View key={order.id} style={styles.orderContainer}>
          <Text style={styles.restaurant}>{order.restaurant}</Text>
          <Text style={styles.total}>{order.total}</Text>
          <Text style={styles.date}>{order.date}</Text>
        </View>
      ))} */}
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