import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Link, useRouter} from "expo-router";
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import StoreDetailsForm from "../components/forms/StoreDetailsForm";

const StoreProfile = () => {
    const router = useRouter();

    return (
        <BasicPageWrapper>
            <View style={styles.breadcrumbContainer}>
                <Link href={'/'} style={styles.goBack}>Go Back</Link>
                <TouchableOpacity style={styles.menuItemsButton}
                                  onPress={() => router.push('/add-menu-items')}>
                    <Text style={styles.menuItemsButtonText}>
                        Handle Menu Items
                    </Text>
                </TouchableOpacity>
            </View>
            <StoreDetailsForm/>
        </BasicPageWrapper>
    )
}

export default StoreProfile;

const styles = StyleSheet.create({
    breadcrumbContainer: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        margin: 18
    },
    goBack: {
        width: '25%'
    },
    menuItemsButton: {
        width: '35%',
        backgroundColor: '#d0a852',
        borderRadius: 16,
    },
    menuItemsButtonText: {
        paddingVertical: 8,
        paddingHorizontal: 6,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 10,
    }
})