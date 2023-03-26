import {View, StyleSheet} from 'react-native';
import FoodItemForm from "../components/forms/FoodItemForm";
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import {Link, useRouter} from "expo-router";

const AddMenuItems = () => {

    return (
        <BasicPageWrapper>
            <View style={styles.breadcrumbContainer}>
                <Link href={'/store-profile'} style={styles.goBack}>Go Back</Link>
            </View>
            <FoodItemForm/>
        </BasicPageWrapper>
    )
}

export default AddMenuItems;

const styles = StyleSheet.create({
    breadcrumbContainer: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        marginTop: 18,
        marginLeft: 18
    },
    goBack: {
        width: '25%'
    },
})