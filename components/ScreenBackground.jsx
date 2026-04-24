import {LinearGradient} from "expo-linear-gradient";
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from "../styles/styles";

export default function ScreenBackground({children}) {
  return (
    <LinearGradient colors={['#EADCC1', '#fffcf2']}
    start={{x: 0.15, y: 0.85}}
    end={{x: 0.85, y: 0.15}}
    style={{ flex: 1 }}>
      <SafeAreaView style={globalStyles.screen} edges={['top', 'left', 'right']}>
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
}