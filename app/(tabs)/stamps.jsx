import { StyleSheet } from 'react-native';
import { Text, View, Image } from "react-native";
import { globalStyles } from "../../styles/styles";
import Screen from "../../pages/Screen";
// import Button from "../../components/Button";
import pieczatka from '../../assets/images/kawka-pieczatka.png';


export default function Stamps() {

  const StampsCard = () => {

    const StampHolder = () => {
      return (
        <View style={{flex:1, height:64, borderWidth:1, borderColor:'#313634', borderRadius:360, backgroundColor:'#fffcf2', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Image source={pieczatka} style={{ width: 52, height: 52, resizeMode:'contain'}} />
        </View>
      );
    }

    const FreeCoffeHolder = () => {
      return (
        <View style={{flex:1, height:64, borderWidth:1, borderColor:'#313634', borderRadius:360, backgroundColor:'#fffcf2', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize:14, color:'#313634', textTransform:'uppercase', textAlign:'center'}}>Kawka gratis</Text>
        </View>
      );
    }

    const StampsColection = () => {
      return (
        <View style={{display:'flex', gap:24, padding:16}}>
          <View style={{display:'flex', flexDirection:'row', gap:16}}>
            <StampHolder />
            <StampHolder />
            <StampHolder />
            <StampHolder />
          </View>
          <View style={{display:'flex', flexDirection:'row', gap:16}}>
            <StampHolder />
            <StampHolder />
            <StampHolder />
            <FreeCoffeHolder />
          </View>
        </View>
      )
    }

    return (
      <View style={{backgroundColor:'#D9D1C2', borderRadius:22, borderWidth:1, borderColor:'rgba(49,54,52,0.5)', shadowColor: '#313634', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.25, shadowRadius: 1.5}}>
        <StampsColection />
      </View>
    )};


  return (
    <Screen 
      headerText={'Twoje pieczątki'} 
      subheaderText={'Zbieraj i wymieniaj'}
    >
      <View style={{gap:24, paddingBottom:24}}>
        {/* <StampsCard /> */}
        {/* <Button style={globalStyles.fullButton} buttonText={'Odbierz kupon'} onPress={() => console.log('Odbierz kupon')}/> */}
      </View>  
    
    </Screen>
  );
}
const style =  StyleSheet.create({



})