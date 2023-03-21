import {View, Text} from 'react-native';
import {Link} from "expo-router";

const HomePage = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Hello World</Text>
        <Link href={'/'}>Home</Link>
        <Link href={'/profile'}>Profile</Link>
        <Link href={'/store-profile'}>Manage Store Details</Link>
    </View>
);

export default HomePage;