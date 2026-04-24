import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Screen from "../../pages/Screen";
import { globalStyles } from "../../styles/styles";
import coffeBeansBottom from "../../assets/images/coffe-beans-bottom.png";
import coffeBeansTop from "../../assets/images/coffe-beans-top.png";
import { FIREBASE_AUTH } from "../../firebase/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {

  const iconPaths = {
    mail: 'M507.49,101.721L352.211,256L507.49,410.279c2.807-5.867,4.51-12.353,4.51-19.279V121 C512,114.073,510.297,107.588,507.49,101.721z M467,76H45c-6.927,0-13.412,1.703-19.279,4.51l198.463,197.463c17.548,17.548,46.084,17.548,63.632,0L486.279,80.51 C480.412,77.703,473.927,76,467,76z M4.51,101.721C1.703,107.588,0,114.073,0,121v270c0,6.927,1.703,13.413,4.51,19.279L159.789,256L4.51,101.721z M331,277.211l-21.973,21.973c-29.239,29.239-76.816,29.239-106.055,0L181,277.211L25.721,431.49 C31.588,434.297,38.073,436,45,436h422c6.927,0,13.412-1.703,19.279-4.51L331,277.211z',
    lock : "M256 160L256 224L384 224L384 160C384 124.7 355.3 96 320 96C284.7 96 256 124.7 256 160zM192 224L192 160C192 89.3 249.3 32 320 32C390.7 32 448 89.3 448 160L448 224C483.3 224 512 252.7 512 288L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 288C128 252.7 156.7 224 192 224z",
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  
  const SingIn = async() => {
    setLoading(true);
    try{
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    }catch(error){
      console.log(error);
      alert('Logowanie nieudane ' + error.message);
    }finally{
      setLoading(false);
    }
  }

  return (
    <Screen headerText={"Logowanie"} headerStyle={style.headerStyle}>
    <Image source={coffeBeansTop} resizeMode="contain" style={{position:'absolute', top:-350, right:0, width:80}}/>
      <View style={{ padding: 24, gap: 24 }}>
        <View style={[globalStyles.boxShadow,{ backgroundColor: "#fffcf2", padding: 20, borderRadius: 22, gap:12}]}>
          <Text style={{textAlign: "center", fontSize: 18, fontFamily: "Poppins-SemiBold", color: "#31572c"}}>Zaloguj się do swojego konta</Text>
          <View>
            <Input label={"E-mail"} placeholder={"twoj@email.pl"} setValue={(text)=>setEmail(text)} path={iconPaths.mail} viewBox={'0 0 512 512'}/>
            <Input label={"Hasło"} placeholder={"Hasło"} setValue={(text)=>setPassword(text)} path={iconPaths.lock} viewBox={'0 0 512 512'} secureTextEntry={true}/>            
          </View>
          {loading ? <ActivityIndicator  color={"#31572c"}/> : 
          <Button
            onPress={SingIn}
            buttonText={"Zaloguj się"}
            style={globalStyles.fullButton}/>
          }
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center", gap: 4, alignItems: "center" }}>
          <Text style={{ fontFamily: "Poppins-Regular" }}>Nie masz jeszcze konta?</Text>
          <Link href={"/register"} asChild>
            <Text style={{ color: "#31572c", fontFamily: "Poppins-Bold" }}>Zarejestruj się</Text>
          </Link>
        </View>
      </View>
      <Image source={coffeBeansBottom} resizeMode="contain" style={{position:'absolute', bottom:0, left:0, zIndex:-1}}/>
      {/* <Image source={coffeBeansBottom} resizeMode="contain" style={{position:'absolute', bottom:0, right:0, zIndex:-1, transform:[{rotateZ: '180deg'}, {rotateX: '180deg'}] }}/> */}
    </Screen>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerStyle: {
    fontSize: 64,
    fontFamily: "Poppins-Medium",
    letterSpacing: -2,
    color: "#31572c",
  },
});
