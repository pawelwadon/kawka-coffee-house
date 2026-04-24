import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../firebase/FirebaseConfig";
import { FIREBASE_DB } from "../firebase/FirebaseConfig";
import { onAuthStateChanged } from 'firebase/auth';
import AuthContext from '../context/AuthContext';
import { doc, onSnapshot } from "firebase/firestore";

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
  
  const [user,setUser] = useState(null);
  const [userData, setUserData] = useState(null)
  
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        onSnapshot(doc(FIREBASE_DB, 'users', user.uid), (doc) => {
          setUserData(doc.data());
          setUser(user);
          })
        } else {
          setUserData(null);
          setUser(null);
        }
    });
  }, []);

  if (!fontsLoaded) {
    console.log("Fonts not loaded yet");
    return null;
  }

  return(
    <AuthContext.Provider value={{user, userData}}>
    <Stack screenOptions={{ headerShown: false }}>  
      <Stack.Screen name="(tabs)" redirect={!user || userData?.role === 'admin'}/>
      <Stack.Screen name="(auth)" redirect={!!user}/>
      <Stack.Screen name="(admin)" redirect={!user || userData?.role !== 'admin'}/>
    </Stack>
    </AuthContext.Provider>
  );
}
{/* <Stack.Screen name="(tabs)" redirect={!user}/>
<Stack.Screen name="(auth)" redirect={user}/>
<Stack.Screen name="(admin)" redirect={user} /> */}