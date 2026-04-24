import { Text, View, ImageBackground, ScrollView, StyleSheet } from "react-native";
import { useState, useContext } from "react";
import AuthContext from '../../context/AuthContext';
import { BlurView } from 'expo-blur';
import Screen from "../../pages/Screen";
import UserQrCode from "../../components/UserQRCode";
import Button from "../../components/Button";
import ScanUserQRCode from "../../components/ScanUserQRCode";
import Icon from "../../components/Icon";
import { globalStyles } from "../../styles/styles";
import kawaCiastoImg from '../../assets/images/kawa-ciasto-dnia.jpg';
import kawkaSniadanieImg from '../../assets/images/kawka-do-sniadania.jpg';

const ScanInCaffeteria = ( props ) => {
  return (
    <View style={[globalStyles.boxShadow, styles.scanInCaffeteria]}>
      <View style={styles.scanInCaffeteriaContent}>
        <View style={styles.scanInCaffeteriaQRCodeContainer}>
          <UserQrCode size={120} userUID={props.userUID}/>
        </View>
        <View style={styles.scanInCaffeteriaTextContainer}>
          {/* <Icon/> */}
          <Text style={styles.scanInCaffeteriaText}>Zeskanuj kod w kawiarni</Text>
        </View>
      </View>
        <View style={styles.scanInCaffeteriaButtonContainer}>
          <Button style={[globalStyles.fullButton, globalStyles.buttonFlex]} buttonText={'Skanuj'} onPress={() => props.setActive(!props.active)}/>
        </View>
    </View>
  );
}

const CoffeePromotion = ( props ) => {
  return (
    <View style={globalStyles.boxShadow}>
        <ImageBackground source={props.imageSrc} resizeMode="cover" style={styles.promotionImage}>
          <BlurView intensity={15} tint="default" style={styles.promotionImageBlur}>  
            <Text style={styles.promotionImagePrice}>{props.price}zł</Text>
            <Text style={[globalStyles.h5, styles.promotionImageText]}>{props.header}</Text>
          </BlurView>
        </ImageBackground>
    </View>
  )
}

const CoffeePromotionConteiner = () =>{
  return(
    <View>
      <Text style={globalStyles.h2}>Kawkowe promocje</Text>
      <ScrollView directionalLockEnabled={false} horizontal={true} style={styles.promotionContainer} contentContainerStyle={{gap:24}}>
        <CoffeePromotion header={'Kawa + ciasto dnia'} price={'28'} imageSrc={kawaCiastoImg}/>
        <CoffeePromotion header={'Kawa do śniadania'} price={'7'} imageSrc={kawkaSniadanieImg}/>
      </ScrollView>
    </View>
  )
}

export default function Index() {
  const[active,setActive] = useState(false);  

  const { user, userData } = useContext(AuthContext);
  const userName = userData.name;

  return (
    <>
    <ScanUserQRCode setActive={setActive} active={active} userUID={user.uid} size={278}/>
    <Screen 
      headerText={`Cześć, ${userName}!`} 
      subheaderText={"Czas na dobrą kawę !"}
      >
      <ScrollView>
        <View style={{gap:24, padding:24}}>
          <ScanInCaffeteria setActive={setActive} active={active} userUID={user.uid}/>
          <CoffeePromotionConteiner/>
        </View>  
      </ScrollView>  
    </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  scanInCaffeteria:{
    flex:1,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'column',
    padding:20,
    backgroundColor:'#fffcf2',
    borderRadius:22,
  },
  scanInCaffeteriaContent: {
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
  },
  scanInCaffeteriaQRCodeContainer: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    justifyContent:'center',
    paddingRight:12,
  },
  scanInCaffeteriaTextContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    paddingLeft:12,
    gap:12
  },
  scanInCaffeteriaText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#31572c',
    textAlign:'center',
  },
  scanInCaffeteriaButtonContainer: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    marginTop:18,
  },
  promotionContainer: {
    display:'flex',
    flexDirection:'row',
    paddingVertical:16,
    overflow:'visible'
  },
  promotionImage: {
    height:210,
    width:210,
    display:"flex",
    justifyContent:"flex-end",
    padding:12,
    borderRadius:22,
    overflow:'hidden',
  },
  promotionImageBlur: {
    padding: 12,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth:1,
    borderColor:'rgba(255,255,255,0.5)',
  },
  promotionImagePrice: {
    fontFamily:'Poppins-Bold',
    fontSize:32,
    color:'#fffcf2',
    shadowColor: '#FFFCF2',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  promotionImageText: {
    color:'#fffcf2',
    letterSpacing:-1,
    fontFamily:'Poppins-SemiBold',
  },
});