import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { useEffect } from "react";

export default function RootLayout() {

    const [fontsLoaded] = useFonts({
      'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
      'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
      'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
      'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
      'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
      'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
      'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
      'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    });
  
    useEffect(() => {
      if (!fontsLoaded) {
        console.log("Fonts not loaded yet");
      }
    }, [fontsLoaded]);

  return(
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
      <Stack.Screen name="gettingStarted" options={{ headerShown: false, title: "Zaczynajmy" }} />
      <Stack.Screen name="login" options={{ headerShown: false, title: "Zaloguj się" }} />
      <Stack.Screen name="register" options={{ headerShown: false, title: "Zarejestruj się" }} />
    </Stack>
);}
