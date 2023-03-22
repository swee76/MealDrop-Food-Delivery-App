import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {useState} from "react";
import {TextInput, TouchableOpacity, View , StyleSheet , Text} from "react-native";
import {auth} from "../firebase";
import {useRouter} from "expo-router";

const Register = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [singedIn, setSingedIn] = useState(false)

    const router = useRouter();

    const handleLogin = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...

                setSingedIn(true)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    return (
        <BasicPageWrapper singedIn={singedIn}>
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
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row'}}>
                    <Text>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => {
                        router.push('/login')
                    }}
                                      style={{marginLeft: 5}}
                    >
                        <Text style={styles.redText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BasicPageWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 18,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#FF5A5F',
        borderRadius: 4,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    redText: {
        color: '#FF5A5F',
    }
});

export default Register;