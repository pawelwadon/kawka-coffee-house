import { Text, View, ScrollView, StyleSheet, ImageBackground } from "react-native";
import Screen from "../../pages/Screen";
import Button from "../../components/Button";
import { globalStyles } from "../../styles/styles";
import couponStructure from '../../assets/images/karta-na-pieczatki.png';

let date = '31.12.2024';

const Coupon = () => {
  return (
    <View style={globalStyles.boxShadow}>
      <ImageBackground source={couponStructure} style={styles.couponBackground} resizeMode="fill">
        <View style={{gap:6}}>
          <Text style={globalStyles.h5}>Kawka gratis</Text>
          <Text style={globalStyles.bodyText}>Wybierz dowolną kawę z naszego menu</Text>
        </View>
        <View style={{gap:6}}>
          <Text style={globalStyles.bodyText}>Ważny do: {date}</Text>
          <Button onPress={() => console.log('Pressed')} style={globalStyles.fullButton} buttonText={'Zrealizuj'} variant="full" />
        </View>
      </ImageBackground>
    </View>
  );
}

export default function Coupons() {
  return (
    <Screen 
      headerText={'Twoje kupony'} 
      subheaderText={'Ciesz się darmową kawą'}
    >
      <ScrollView>
        <View style={{ gap:24, padding:24}}>
          <Coupon />
          <Coupon />
          <Coupon />
          <Coupon />
          <Coupon />
        </View>
      </ScrollView> 
    </Screen>
  );
}

const styles = StyleSheet.create({
  couponBackground: {
    flex:1,
    paddingVertical:20,
    paddingLeft:60,
    paddingRight:20
  },
});