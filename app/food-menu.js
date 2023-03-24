import {View, StyleSheet} from 'react-native';
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import {Link} from "expo-router";
import FoodMenuList from "../components/list/FoodMenuList";

const FoodMenu = () => {
    return (
        <BasicPageWrapper>
            <View style={styles.breadcrumbContainer}>
                <Link href={'/'} style={styles.goBack}>Go Back</Link>
            </View>
            <FoodMenuList/>
        </BasicPageWrapper>
    )
}

export default FoodMenu;

const styles = StyleSheet.create({
    breadcrumbContainer: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        marginTop: 18,
        marginLeft: 18,
        marginBottom: 8
    },
    goBack: {
        width: '25%'
    },
})