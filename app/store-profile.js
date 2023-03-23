import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Link} from "expo-router";
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import StoreDetailsForm from "../components/forms/StoreDetailsForm";

const StoreProfile = () => {
    return (
        <BasicPageWrapper>
            <View>
                <View style={styles.breadcrumbContainer}>
                    <Link href={'/'} style={styles.goBack}>Go Back</Link>
                    <TouchableOpacity style={styles.menuItemsButton}
                                      href={'/add-menu-items'}>
                        <Text style={styles.menuItemsButtonText}>
                            Handle Menu Items
                        </Text>
                    </TouchableOpacity>
                </View>
                <StoreDetailsForm/>
            </View>
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
        width: '15%'
    },
    menuItemsButton: {
        width: '30%',
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