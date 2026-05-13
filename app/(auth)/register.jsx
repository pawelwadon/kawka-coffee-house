import { Text, View, Image, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";
import { FIREBASE_AUTH } from "../../firebase/FirebaseConfig";
import { FIREBASE_DB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { addVisitsHistory } from '../../firebase/addVisitsHistory';
import Screen from "../../pages/Screen";
import Button from "../../components/Button";
import Input from "../../components/Input";
import coffeBeansBottom from "../../assets/images/coffe-beans-bottom.png";
import coffeBeansTop from "../../assets/images/coffe-beans-top.png";
import { globalStyles } from "../../styles/styles";

export default function Register() {

  const iconPaths = {
    profile: 'M256,0c-74.439,0-135,60.561-135,135s60.561,135,135,135s135-60.561,135-135S330.439,0,256,0z M423.966,358.195C387.006,320.667,338.009,300,286,300h-60c-52.008,0-101.006,20.667-137.966,58.195 C51.255,395.539,31,444.833,31,497c0,8.284,6.716,15,15,15h420c8.284,0,15-6.716,15-15 C481,444.833,460.745,395.539,423.966,358.195z',
    mail: 'M507.49,101.721L352.211,256L507.49,410.279c2.807-5.867,4.51-12.353,4.51-19.279V121 C512,114.073,510.297,107.588,507.49,101.721z M467,76H45c-6.927,0-13.412,1.703-19.279,4.51l198.463,197.463c17.548,17.548,46.084,17.548,63.632,0L486.279,80.51 C480.412,77.703,473.927,76,467,76z M4.51,101.721C1.703,107.588,0,114.073,0,121v270c0,6.927,1.703,13.413,4.51,19.279L159.789,256L4.51,101.721z M331,277.211l-21.973,21.973c-29.239,29.239-76.816,29.239-106.055,0L181,277.211L25.721,431.49 C31.588,434.297,38.073,436,45,436h422c6.927,0,13.412-1.703,19.279-4.51L331,277.211z',
    lock : "M256 160L256 224L384 224L384 160C384 124.7 355.3 96 320 96C284.7 96 256 124.7 256 160zM192 224L192 160C192 89.3 249.3 32 320 32C390.7 32 448 89.3 448 160L448 224C483.3 224 512 252.7 512 288L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 288C128 252.7 156.7 224 192 224z",
  };

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const authErrors = {
  "auth/email-already-in-use": "Konto z tym adresem e-mail już istnieje",
  "auth/weak-password": "Hasło jest za słabe",
  "auth/missing-password": "Podaj hasło",
  "auth/invalid-email": "Nieprawidłowy adres e-mail",
  "auth/invalid-credential": "Nieprawidłowy e-mail lub hasło",
  "auth/user-disabled": "To konto zostało zablokowane",
  "auth/too-many-requests": "Za dużo prób. Spróbuj ponownie za chwilę",
  "auth/network-request-failed": "Brak połączenia z internetem",
  };

  const SignUp = async() => {
    setLoading(true);
    try{
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(FIREBASE_DB, 'users', response.user.uid), {
        name: name,
        surname: surname,
        stamps:1,
        coupons:[],
        visits:[],
        allTimeStamps:1,
        allTimeCoupons:0,
        role:'client',
      });
      await addVisitsHistory({ clientName: `${name} ${surname}`, activity: 'Nowy użytkownik', type: 'registration', count:1});
      console.log(response);
    }catch(error){
      console.log(error)
      const message = authErrors[error.code] ?? "Rejestracja nieudane. Spróbuj ponownie.";
      alert(message);
    }finally{
      setLoading(false);
    }
  }

  const handleSignUp = () => {
  if (name.length < 1 || surname.length < 1) {
    alert("Uzupełnij brakujące pola");
    return;
  }
  SignUp();
};

  return (
  <Screen headerText={"Rejestracja"} headerStyle={style.headerStyle}>
    <Image source={coffeBeansTop} resizeMode="contain" style={{position:'absolute', top:-350, right:0, width:80}}/>
    <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 24, gap: 24 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={[globalStyles.boxShadow,{ backgroundColor: "#fffcf2", padding: 20, borderRadius: 22, gap:12 }]}>
          <Text style={{ textAlign: "center",fontSize: 18,fontFamily: "Poppins-SemiBold",color: "#31572c" }}>Utwórz nowe konto</Text>
          <View>
            <Input label={"Imię"} placeholder={"Jan"} setValue={(text)=>setName(text)} path={iconPaths.profile} viewBox={'0 0 512 512'}/>
            <Input label={"Nazwisko"} placeholder={"Kowalski"} setValue={(text)=>setSurname(text)} path={iconPaths.profile} viewBox={'0 0 512 512'}/>
            <Input label={"E-mail"} placeholder={"twoj@email.pl"} setValue={(text)=>setEmail(text)} path={iconPaths.mail} viewBox={'0 0 512 512'}/>
            <Input label={"Hasło"} placeholder={"Hasło"} setValue={(text)=>setPassword(text)} path={iconPaths.lock} viewBox={'0 0 512 512'} secureTextEntry={true}/>
            {password.length > 0 && (<Text style={style.passwordRequirement}>Hasło powinno składać się z min. 6 znaków w tym 1 wielkiej litery, 1 cyfry oraz 1 znaku specjalnego</Text>)}
          </View>
          {loading ? <ActivityIndicator color={"#31572c"}/> : 
            <Button
              onPress={handleSignUp}
              buttonText={"Zarejestruj się"}
              style={globalStyles.fullButton}/>
          }
        </View>
        <View style={{ flexDirection: "row",justifyContent: "center",gap: 4,alignItems: "center" }}>
          <Text style={{ fontFamily: "Poppins-Regular" }}>Masz już konto?</Text>
          <Link href={"/login"} asChild>
            <Text style={{ color: "#31572c", fontFamily: "Poppins-Bold" }}>Zaloguj się</Text>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    <Image source={coffeBeansBottom} resizeMode="contain" style={{position:'absolute', bottom:0, left:0, zIndex:-1}}/>
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
    passwordRequirement:{
    fontSize:10,
    fontFamily:'Poppins-Light',
    marginTop:-8
  },
});
