import {View} from "react-native";
import BasicPageWrapper from "../components/wrappers/BasicPageWrapper";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {useState} from "react";
const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });


    return (
        <BasicPageWrapper singedIn={true}>
            <Text>Login</Text>
        </BasicPageWrapper>
    );
};

export default Login;