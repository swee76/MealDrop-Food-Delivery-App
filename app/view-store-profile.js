import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Link} from "expo-router";
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import React from "react";

const ViewStoreProfile = () => {
    return (
        <BasicPageWrapper>
            <View style={styles.breadcrumbContainer}>
                <Link href={'/'} style={styles.goBack}>Go Back</Link>
            </View>
            <View style={styles.container}>
                <Text style={styles.heading}>~Store Details~</Text>
                <Image source={require('../../assets/landing-home-phone-new.png')}
                       style={{width: 200, height: 160, margin: 12}}/>

                <TextInput
                    style={styles.input}
                    placeholder="Store Name"
                    value={storeName}
                    onChangeText={setStoreName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Location"
                    value={location}
                    onChangeText={setLocation}
                    // editable={isEditMode}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Business Hours"
                    value={businessHours}
                    onChangeText={setBusinessHours}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contact Information"
                    value={contactInfo}
                    onChangeText={setContactInfo}
                />

                <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>
                        Save
                    </Text>
                </TouchableOpacity>

                {/*     onPress={handleSubmit}*/}
                {/*    onPress={handleEditModeToggle}*/}
            </View>
        </BasicPageWrapper>
    )
}

export default ViewStoreProfile;

const styles = StyleSheet.create({
    breadcrumbContainer: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        margin: 18,
        position: 'relative'
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
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 16,
        position: 'relative',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '90%',
    },
    buttonContainer: {
        width: '90%',
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