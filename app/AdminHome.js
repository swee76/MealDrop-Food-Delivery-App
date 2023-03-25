import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Link} from "expo-router";
import {useRouter} from "expo-router";

const AdminHome = () => {
    const router = useRouter();

    const profiles = [
        {
            name: 'Order history',
            link: '/orderHistory'
        }, {
            name: 'Menues',
            link: '/menuScreen'
        }, {
            name: 'Owner Details',
            link: '/OwnerDetails'
        }
    ]
    
    return (
    
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'} }>

        <View style={styles.profileContainer}>
        {profiles.map((profile, index) => (
                    <TouchableOpacity
                        onPress={() => router.push(profile.link)}
                        style={styles.profileButton} key={index}>
                        <Text style={styles.profileButtonText}>{profile.name}</Text>
                    </TouchableOpacity>
                ))}
                </View>
    </View>
);}

export default AdminHome;

const styles = StyleSheet.create({
    topic: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20
    },
    profileContainer: {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        margin: 18
    },
    profileButton: {
        width: '40%',
        backgroundColor: '#FF5A5F',
        borderRadius: 16,
        paddingVertical: 8,
        marginVertical: 8
    },
    profileButtonText: {
        paddingVertical: 8,
        paddingHorizontal: 6,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 30,
    }
})
