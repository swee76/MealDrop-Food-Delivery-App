import {Text, View} from 'react-native';
import {Link} from "expo-router";

const MyComponent = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            marginBottom: 20
        }}>Hello Profile</Text>
        <Link href={'/'}>Home</Link>
        <Link href={'/profile'}>Profile</Link>
    </View>
);

export default MyComponent;