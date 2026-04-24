import { Stack } from "expo-router";

export default function LoginLayout(){
   
return(
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="gettingStarted"/>
      <Stack.Screen name="login"/>
      <Stack.Screen name="register" />
    </Stack>
)
}