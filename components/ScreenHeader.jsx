import { Text, View } from "react-native";
import { globalStyles } from "../styles/styles";

export default function ScreenHeader({headerText,subheaderText}) {
  return (
    <View style={{ gap: 16, paddingTop: 24 }}>
        <Text style={globalStyles.h1}>{headerText}</Text>
        <Text style={globalStyles.h4}>{subheaderText}</Text>
    </View>
  );
}