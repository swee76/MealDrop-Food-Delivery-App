import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import {Link, useRouter} from "expo-router";
import FoodMenuList from "../components/list/FoodMenuList";
import React from "react";

const FoodMenu = () => {
    const router = useRouter();

    return (
        <BasicPageWrapper>
            <View style={styles.breadcrumbContainer}>
                <Link href={'/'} style={styles.goBack}>Go Back</Link>
                <TouchableOpacity style={styles.menuItemsButton}
                                  onPress={() => router.push('/add-menu-items')}>
                    <Text style={styles.menuItemsButtonText}>
                        Add Menu Items
                    </Text>
                </TouchableOpacity>
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
    },
})