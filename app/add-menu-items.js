import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import FoodItemForm from "../components/forms/FoodItemForm";
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";

const AddMenuItems = () => {
    return (
        <BasicPageWrapper>
            <View>
                <FoodItemForm/>
            </View>
        </BasicPageWrapper>
    )
}

export default AddMenuItems;