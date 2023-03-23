import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import {useRouter} from "expo-router";

const profileSelect = () => {
    const router = useRouter();

    const profiles = [
        {
            name: 'Rider',
            link: '/rider-profile'
        }, {
            name: 'Store',
            link: '/store-profile'
        }
    ]

    return (
        <BasicPageWrapper>
            <View style={{
                display: "flex",
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 20
            }}>
                <Text style={styles.topic}>Choose your profile type</Text>
            </View>
            <View style={styles.profileContainer}>
                {profiles.map((profile, index) => (
                    <TouchableOpacity
                        onPress={() => router.push(profile.link)}
                        style={styles.profileButton} key={index}>
                        <Text style={styles.profileButtonText}>{profile.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </BasicPageWrapper>
    )
}

export default profileSelect;

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