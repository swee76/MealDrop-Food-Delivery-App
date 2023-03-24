import {StyleSheet, Text, View} from 'react-native';
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";

const RiderProfile = () => {
    return (
        <BasicPageWrapper>
            <View style={styles.subHeadingBox}>
                <Text style={styles.subHeadingText}>Rider Profile</Text>
            </View>
            <View>
                <Text>Profile</Text>
            </View>
        </BasicPageWrapper>
    )
}

export default RiderProfile;

const styles = StyleSheet.create({
    subHeadingBox: {
        backgroundColor: '#e55259',
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    subHeadingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
    }
})