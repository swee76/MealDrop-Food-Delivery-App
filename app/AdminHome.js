import {View, Text} from 'react-native';
import {Link} from "expo-router";

const AdminHome = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'} }>
        <Text>Hello World</Text>
        <Link href={'/orderHistory'}>Order history</Link>
        <Link href={'/menuScreen'}>Menues</Link>
        <Link href={'/OwnerDetails'}>Owner</Link>
    </View>
);

export default AdminHome;
