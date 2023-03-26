import {View, Text, StyleSheet} from 'react-native';
import {useRouter} from "expo-router";
import {useEffect} from "react";

const HomePage = () => {
    const router = useRouter()

    useEffect(() => {
        router.push('/login')
    }, [])

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.header}>Navigation Links for Sections</Text>
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
