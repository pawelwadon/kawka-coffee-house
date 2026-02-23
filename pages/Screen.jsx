import { View, SafeAreaView } from "react-native";
import { globalStyles } from "../styles/styles";
import ScreenHeader from "../components/ScreenHeader";
import ScreenContent from "../components/ScreenContent";
import {LinearGradient} from "expo-linear-gradient";

export default function Screen({headerText,subheaderText,children}) {
  return (
    <LinearGradient colors={['#EADCC1', '#fffcf2']}
    start={{x: 0.15, y: 0.85}}
    end={{x: 0.85, y: 0.15}}
    style={{ flex: 1 }}>
      <SafeAreaView style={globalStyles.screen}>
        <View style={globalStyles.header}>
          <ScreenHeader headerText={headerText} subheaderText={subheaderText} />
        </View>
        <ScreenContent> 
          {children}
        </ScreenContent>
      </SafeAreaView>
    </LinearGradient>
  );
}