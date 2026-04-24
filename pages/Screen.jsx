import { View } from "react-native";
import ScreenBackground from "../components/ScreenBackground";
import ScreenHeader from "../components/ScreenHeader";
import ScreenContent from "../components/ScreenContent";
import { globalStyles } from "../styles/styles";

export default function Screen({ headerText, subheaderText, children, headerStyle }) {
  return (
    <ScreenBackground>
      <View style={globalStyles.header}>
          <ScreenHeader headerText={headerText} subheaderText={subheaderText} headerStyle={headerStyle || globalStyles.h1}/>
      </View>
      <ScreenContent> 
        {children}
      </ScreenContent>
    </ScreenBackground>
  );
}