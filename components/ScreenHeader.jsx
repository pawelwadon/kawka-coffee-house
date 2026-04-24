import { Text, View } from "react-native";
import { globalStyles } from "../styles/styles";

export default function ScreenHeader( props ) {
  return (
    <View style={{ gap: 16, paddingTop: 24 }}>
        <Text style={props.headerStyle}>{props.headerText}</Text>
        <Text style={globalStyles.h4}>{props.subheaderText}</Text>
    </View>
  );
}