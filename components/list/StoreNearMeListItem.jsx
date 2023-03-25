import {StyleSheet, Text, View} from "react-native";

const StoreNearMeListItem = ({store}) => {
    return (
        <View style={styles.row}>
            <Text style={styles.title}>{store.storeName}</Text>
            <Text style={styles.title}>{store.contactInfo}</Text>
        </View>
    );
};

export default StoreNearMeListItem;


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray',
    },
    title: {
        fontSize: 18,
    },
    subTitle: {
        color: 'gray',

    }
})