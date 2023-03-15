import "expo-router/entry";

// Path: index.js
import {Text, View} from 'react-native';
import {Link, useRouter} from "expo-router";
import {useEffect} from "react";


const MyComponent = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push('/');
        } , 3000);
    }, []);


    return <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
        }}>Loading...</Text>
    </View>
};
export default MyComponent;