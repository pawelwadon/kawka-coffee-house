import { Text, View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {LinearGradient} from "expo-linear-gradient";
import Button from "../../components/Button";
import { globalStyles } from "../../styles/styles";
import logo from "../../assets/images/logo-kawka.png";
import coffeBeansBottom from "../../assets/images/coffe-beans-bottom.png";
import coffeBeansTop from "../../assets/images/coffe-beans-top.png";
import { Link } from "expo-router";

export default function gettingStarted () {

  return (
    <LinearGradient colors={['#EADCC1', '#fffcf2']}
      start={{x: 0.15, y: 0.85}}
      end={{x: 0.85, y: 0.15}}
      style={{ flex: 1 }}>
      <SafeAreaView style={globalStyles.screen} edges={['top', 'left', 'right']}>
      <Image source={coffeBeansTop} resizeMode="contain" style={{position:'absolute', top:0, right:0}}/>
        <View style={style.container}>
          <Image source={logo} resizeMode="contain"/>
          <View>
            <Text style={[globalStyles.h2, {fontFamily:'Poppins-SemiBold', letterSpacing:-1, lineHeight:52, textAlign:'center'}]}>Kawka Coffe House</Text>
            <Text style={[globalStyles.h3, {fontFamily:'Poppins-Regular', textAlign:'center'}]}>Skanuj. Zbieraj. Wymieniaj</Text>
          </View>
          <Link href={'/login'} asChild>
            <Button buttonText={'Zaczynajmy'} style={globalStyles.fullButton}/>
          </Link>
        </View>
      <Image source={coffeBeansBottom} resizeMode="contain" style={{position:'absolute', bottom:0, left:0, zIndex:-1}}/>
      </SafeAreaView>
    </LinearGradient>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding:24,
    gap:26,
  },
})
