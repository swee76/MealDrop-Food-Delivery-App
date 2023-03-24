import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const StoreDetailsCard = ({store}) => {
    const handleEditStoreDetails = (name) => {

    }

    const handleDeleteMenuItem = (id) => {

    }

    return (
        <View key={store.id} style={styles.container}>
            <View style={styles.headerWrapper}>
                <Text style={styles.title}>{store.storeName}</Text>
                <TouchableOpacity onPress={handleDeleteMenuItem(store.id)} style={styles.deleteButton}>
                    <MaterialCommunityIcons name="delete-circle-outline" size={32} color="red"/>
                </TouchableOpacity>
            </View>

            <View style={styles.field}>
                <Text>{'\u2022'} Store Location:</Text>
                <Text style={styles.data}>{store.storeLocation}</Text>
            </View>
            <View style={styles.field}>
                <Text>{'\u2022'} Business Hours:</Text>
                <Text style={styles.data}>{store.businessHours}</Text>
            </View>
            <View style={styles.field}>
                <Text>{'\u2022'} Contact Info:</Text>
                <Text style={styles.data}>{store.contactInfo}</Text>
            </View>

            <TouchableOpacity style={styles.buttonContainer} onPress={handleEditStoreDetails(store.id)}>
                <Text style={styles.buttonText}>
                    Edit
                </Text>
            </TouchableOpacity></View>
    )
}

export default StoreDetailsCard;

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        position: 'relative',
        width: '90%',
        backgroundColor: '#f1ede7',
        padding: 8,
        elevation: 2,
        borderRadius: 6,
    },
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    field: {
        flexDirection: 'row',
        marginVertical: 6
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    data: {
        color: '#938e8e',
        marginLeft: 10
    },
    buttonContainer: {
        width: '100%',
        backgroundColor: '#e7b8ae',
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        padding: 10,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 16,
        color: '#fff'
    },
})