import {View} from "react-native";
import Header from "../core/Header";
import {useEffect} from "react";


const BasicPageWrapper = ({children, singedIn}) => {

    useEffect(() => {
        console.log('singedIn', singedIn)
    }, [singedIn])

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            backgroundColor: '#fff',
        }}>
            <Header/>
            {children}
        </View>
    );
};

export default BasicPageWrapper;