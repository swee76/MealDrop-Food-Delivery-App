import {Text, View , TouchableOpacity} from 'react-native';
import tw from 'twrnc';

export default function App() {
  return (
      <View style={tw`pt-6 bg-blue-100 h-full w-full`}>
        <View style={tw`bg-red-200 m-auto py-2 px-4 rounded-full shadow-lg active:bg-red-400`}>
            <TouchableOpacity>
                <Text style={tw`text-white text-center`}>Hello World</Text>
            </TouchableOpacity>
        </View>
      </View>
  );
}



