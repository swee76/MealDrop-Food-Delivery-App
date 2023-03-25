import {Text, View} from "react-native";


const Header = ({user}) => {

    return (
        <View style={{
            height: 90,
            backgroundColor: '#FF5A5F',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text
            style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'white',
                marginTop: 20
            }}
            >MealDrop</Text>
        </View>
    );
};

export default Header;