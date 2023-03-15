import {View} from "react-native";
import Header from "../core/Header";


const BasicPageWrapper = ({children}) => {
    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            backgroundColor: '#fff',
        }}>
            <Header/>
            {children}
        </View>
    );
};

export default BasicPageWrapper;