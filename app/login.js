import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import {signInWithEmailAndPassword} from "firebase/auth";
import {useState} from "react";
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {auth, database} from "../firebase";
import {useRouter} from "expo-router";
import {onValue, ref} from "firebase/database";
import {storeObject} from "../storage";

const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [singedIn, setSingedIn] = useState(false)

    const router = useRouter();

    const [loading, setLoading] = useState(false)

    const handleLogin = () => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                readUser(user.uid)
                    .then((data) => {
                        setSingedIn(true)
                        storeObject('user', {
                            email: email, type: data.type, id: user.uid
                        })
                            .then(() => {
                                setSingedIn(true)

                                if (data.type === 'rider') {
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
                // ..

                Alert.alert(errorMessage)
            });
    }


    const readUser = async (userId) => {
        const userData = ref(database, 'users/' + userId);

        let user

        onValue(userData, (snapshot) => {
            user = snapshot.val()
        })

        return user
    }

    return (<BasicPageWrapper singedIn={singedIn}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
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
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>
                        {loading ? 'Loading...' : 'Login'}
                    </Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row'}}>
                    <Text>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => {
                        router.push('/register')
                    }}
                                      style={{marginLeft: 5}}
                    >
                        <Text style={styles.redText}>
                            Register
                        </Text>
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
        fontWeight: 'bold',
        marginBottom: 20,
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
    }
});

export default Login;