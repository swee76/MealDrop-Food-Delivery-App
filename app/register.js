import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {useState} from "react";
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {auth, database} from "../firebase";
import {useRouter} from "expo-router";
import {Picker} from '@react-native-picker/picker';
import {ref, set} from "firebase/database";
import {storeObject} from "../storage";

const Register = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [singedIn, setSingedIn] = useState(false)
    const [type, setType] = useState('')

    const [pickerFocused, setPickerFocused] = useState(false)

    const router = useRouter();


    const [loading, setLoading] = useState(false)
    const handleLogin = () => {
        setLoading(true)

        if (!email || !password || !type || type === '') {
            alert('Please fill all fields')
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                createUser(user.uid)
                    .then(() => {
                        storeObject('user', {
                            email: email, type: type, id: user.uid
                        })
                            .then(() => {
                                setSingedIn(true)
                                setLoading(false)

                                if (type === 'rider') {
                                    router.push('/rider-profile')
                                } else {
                                    router.push('/')

                                }

                            })
                    })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                Alert.alert(errorMessage)
                // ..
            });
    }

    const createUser = async (userID) => {
        await set(ref(database, 'users/' + userID), {
            email: email, type: type,
        })
    }

    return (<BasicPageWrapper singedIn={singedIn}>
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            <Picker
                placeholder={'Select type'}
                mode="dropdown"  //android only
                selectedValue={type}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => {
                    setType(itemValue)
                }}
                onFocus={() => setPickerFocused(true)}
                onBlur={() => setPickerFocused(false)}
            >
                <Picker.Item label="Please Select User Type" value="" enabled={!pickerFocused}/>
                <Picker.Item label="Rider" value="rider"/>
                <Picker.Item label="Customer" value="customer"/>
                <Picker.Item label="Food Store Owner" value="store-owner"/>
            </Picker>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>
                    {loading ? 'Loading...' : 'Register'}
                </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={() => {
                    router.push('/login')
                }} style={{marginLeft: 5}}>
                    <Text style={styles.redText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    </BasicPageWrapper>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, title: {
        fontSize: 24,
        fontWeight: 'bold', marginBottom: 20,
    }, input: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 18,
        marginBottom: 10,
    }, button: {
        backgroundColor: '#FF5A5F',
        borderRadius: 4,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
    }, buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }, redText: {
        color: '#FF5A5F',
    }, picker: {
        width: 300,
        padding: 10,
        borderWidth: 1,
        borderColor: "#666",
    }
});

export default Register;
