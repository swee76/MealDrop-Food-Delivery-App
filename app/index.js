import { View, Text } from 'react-native';
import {Link} from "expo-router";

const HomePage = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'} }>
        <Text >Hello World</Text>
        <Link href={'/'}>Home</Link>
        <Link href={'/login'}>Login</Link>
    </View>
);

export default HomePage;