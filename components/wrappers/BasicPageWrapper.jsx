import {View} from "react-native";
import Header from "../core/Header";
import {useEffect, useState} from "react";
import {getData} from "../../storage";


const BasicPageWrapper = ({children, singedIn}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        getData('user').then((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        })
    }, [singedIn])

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            backgroundColor: '#fff',
        }}>
            <Header user={user}/>
            {children}
        </View>
    );
};

export default BasicPageWrapper;