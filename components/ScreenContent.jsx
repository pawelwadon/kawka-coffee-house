import { ScrollView, View } from "react-native";
import { globalStyles } from "../styles/styles";

export default function ScreenContent({ children }) {
  return (
    <View style={globalStyles.contentHolder}>
        {children}
    </View>
  );
}