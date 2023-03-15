import { View, Text } from 'react-native';
import tw from 'twrnc';
import {Link} from "expo-router";

const MyComponent = () => (
    <View style={tw`p-4 android:pt-2 bg-white dark:bg-black`}>
        <Text style={tw`text-md text-black dark:text-white`}>Hello World</Text>
        <Link href={'/'}>Home</Link>
        <Link href={'/profile'}>Profile</Link>
    </View>
);

export default MyComponent;