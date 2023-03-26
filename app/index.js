import {View, Text, StyleSheet} from 'react-native';
import {Link, useRouter} from "expo-router";
import {useEffect} from "react";

const HomePage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/login')
    }, [])

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.header}>Navigation Links for Sections</Text>
            <View style={styles.navLinks}>
                <Link href={'/'}>Home</Link>
                <Link href={'/profile'}>Profile</Link>
                <Link href={'/store-profile'}>Manage Store Details</Link>
                <Link href={'/login'}>Login</Link>
                <Link href={'/choose-type'}>Profile Type select</Link>
                <Link href={'/admin-home'}>Admin Home</Link>
                <Link href={'/food-menu'}>View Food Menu List</Link>
                <Link href={'/view-store-list'}>View Store List</Link>
            </View>
        </View>
    )
};

export default HomePage;

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: '600',
        textDecorationLine: 'underline'
    },
    navLinks: {
        marginTop: 14,
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 10
    }
});