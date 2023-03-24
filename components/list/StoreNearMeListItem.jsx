import {Text, View} from "react-native";

const StoreNearMeListItem = ({store}) => {
    return (
        <View>
            <Text>{store.storeName}</Text>
        </View>
    );
};

export default StoreNearMeListItem;