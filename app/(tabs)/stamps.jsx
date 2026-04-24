import { Text, View, Image, StyleSheet } from "react-native";
import { useContext } from "react";
import AuthContext from '../../context/AuthContext';
import { FIREBASE_DB } from "../../firebase/FirebaseConfig";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import Screen from "../../pages/Screen";
import Button from "../../components/Button";
import { globalStyles } from "../../styles/styles";
import pieczatka from '../../assets/images/kawka-pieczatka.png';

const Stamp = () => {

  return( <Image source={pieczatka} style={style.stampsImage} /> )
};

const StampHolder = ( props ) => {

  return (
    <View style={[style.stampsHolder, {borderStyle: props.children ? 'solid' : 'dotted'}]}>
      {props.children}
    </View>
  );
};

const FreeCoffeHolder = ( props ) => {

  return (
    <View style={[style.stampsHolder, {borderStyle: props.stampsAmount >= 7 ? 'solid' : 'dotted'}]}>
      <Text style={style.freeCoffeHeader}>Kawka gratis</Text>
    </View>
  );
};

const StampsCard = ( props ) => {

  const stamps = Array(7).fill(null).map((_, index) => (
    <StampHolder key={index}>
      {index < props.userStamps ? <Stamp/> : null}
    </StampHolder>
  ));

  return (
    <View style={[style.stampsCard, globalStyles.boxShadow]}>
    <View style={style.stampsColection}>
      <View style={style.stampsColectionRow}>
        {stamps.slice(0, 4)}
      </View>
      <View style={style.stampsColectionRow}>
        {stamps.slice(4, 7)}
        <FreeCoffeHolder stampsAmount={props.userStamps}/>
      </View>
    </View>
    </View>
  )
};

  const collectCoupon = async (userStamps,user) => {
    let currentStamps = userStamps;

    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 3);

    const day = expiryDate.getDate();
    const month = expiryDate.getMonth() + 1;
    const year = expiryDate.getFullYear();
    const expirationDate = `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}r.`;

    try{
      if(currentStamps >= 7){
        await updateDoc(doc(FIREBASE_DB, 'users', user.uid), {
          stamps : currentStamps - 7,
          coupons: arrayUnion({ expirationDate: expirationDate }),
        });
        console.log(`Pieczątki wymienione na kupon, uzytkownikowi zostało ${currentStamps - 7}`)
      }
    }catch(error){
      console.log(error)
    }
  };

export default function Stamps() {

  const { user, userData } = useContext(AuthContext);
  const userStamps = userData.stamps;
  console.log(userStamps)

  return (
    <Screen 
      headerText={'Twoje pieczątki'} 
      subheaderText={'Zbieraj i wymieniaj'}
    >
      <View style={{gap:24, padding:24}}>
        <StampsCard userStamps={userStamps}/>
        <Button style={globalStyles.fullButton} buttonText={'Odbierz kupon'} onPress={() => collectCoupon(userStamps, user)}/>
      </View>  
    </Screen>
  );
};

const style =  StyleSheet.create({
  stampsCard:{
    backgroundColor:'#fffcf2',
    borderRadius:22,
  },
  stampsHolder: {
    width:64, 
    height:64, 
    borderWidth:1,
    borderColor:'#313634',
    borderStyle:'dotted',
    borderRadius:100,
    backgroundColor:'#fffcf2', 
    alignItems:'center',
    justifyContent:'center',
  },
  stampsImage: { 
    width: 52, 
    height: 52,
    resizeMode:'contain'},
  freeCoffeHeader: {
    fontSize:14, 
    color:'#313634',
    textTransform:'uppercase',
    textAlign:'center',
  },
  stampsColection: {
    gap:24,
    padding:16,
  },
  stampsColectionRow: {
    flexDirection:'row',
    justifyContent:'space-between'
  },
})