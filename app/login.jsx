import { Text, View } from "react-native";
import Screen from "../pages/Screen";

export default function Login() {
  return (
    <Screen 
      headerText={`Logowanie`}>
      <View>
        <Text>Logowanie</Text>
      </View>  
    </Screen>
  );
}