import {Text} from 'react-native';
import {Link} from "expo-router";
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import {useState} from "react";

const Profile = () => {




    return <BasicPageWrapper>
        <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            marginBottom: 20
        }}>Hello Profile</Text>
        <Link href={'/'}>Home</Link>
        <Link href={'/profile'}>Profile</Link>
    </BasicPageWrapper>
};

export default Profile;