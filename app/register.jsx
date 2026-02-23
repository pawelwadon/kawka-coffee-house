import { Text, View } from "react-native";
import Screen from "../pages/Screen";

export default function Register() {
  return (
    <Screen 
      headerText={`Rejestracja`}>
      <View>
        <Text>Rejestracja</Text>
      </View>  
    </Screen>
  );
}