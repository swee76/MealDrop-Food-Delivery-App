import { View, Text } from 'react-native';
import {Link} from "expo-router";

const MyComponent = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'} }>
        <Text >Hello World</Text>
        <Link href={'/'}>Home</Link>
        <Link href={'/profile'}>Profile</Link>
    </View>
);

export default MyComponent;