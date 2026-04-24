import { Text, View, ScrollView, StyleSheet, ImageBackground } from "react-native";
import { useContext } from "react";
import AuthContext from '../../context/AuthContext';
import { FIREBASE_DB } from "../../firebase/FirebaseConfig";
import { doc, updateDoc, arrayRemove, increment, arrayUnion } from "firebase/firestore";
import { addVisitsHistory } from '../../firebase/addVisitsHistory';
import Screen from "../../pages/Screen";
import Button from "../../components/Button";
import { globalStyles } from "../../styles/styles";
import couponStructure from '../../assets/images/karta-na-pieczatki.png';

const redeemCoupon = async (user, expirationDate, userName ) => {
    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const dateOfVisit = `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}r.`;

  try{
    await updateDoc(doc(FIREBASE_DB, 'users', user.uid), {
      coupons: arrayRemove({ expirationDate: expirationDate }),
      allTimeCoupons: increment(1),
      visits: arrayUnion({ collectedCoupon : 1, dateOfVisit : dateOfVisit, type:'coupon'})
    });

    await addVisitsHistory({ clientName: userName, activity: `Zrealizowano kupon`, type: 'coupon', count:1});

    console.log(`Kupon wazny do ${expirationDate} usunięty`)
  }catch(error){
    console.log(error)
  };
}

const Coupon = (props) => {
  return (
    <View style={globalStyles.boxShadow}>
      <ImageBackground source={couponStructure} style={styles.couponBackground} resizeMode="contain">
        <View style={{gap:6}}>
          <Text style={globalStyles.h5}>Kawka gratis</Text>
          <Text style={globalStyles.bodyText}>Wybierz dowolną kawę z naszego menu</Text>
        </View>
        <View style={{gap:6}}>
          <Text style={globalStyles.bodyText}>Ważny do: {props.date}</Text>
          <Button onPress={() => redeemCoupon(props.user,props.date, props.userName)} style={globalStyles.fullButton} buttonText={'Zrealizuj'} variant="full" />
        </View>
      </ImageBackground>
    </View>
  );
};

export default function Coupons() {

  const { user, userData } = useContext(AuthContext);
  const userCoupons = userData.coupons;
  const userName = `${userData.name} ${userData.surname}`
  console.log(userCoupons)

  return (
    <Screen 
      headerText={'Twoje kupony'} 
      subheaderText={'Ciesz się darmową kawą'}
    >
      <ScrollView>
        <View style={{ gap:24, padding:24}}>
          {userCoupons && userCoupons.length > 0 ? (userCoupons.map((value,index)=> <Coupon key={index} date={value.expirationDate} user={user} userName={userName}/>)) : (<Text style={styles.outOfCoupons}>Nie masz jeszcze kuponów</Text>)}
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
  outOfCoupons:[
    globalStyles.h5,
    {textAlign:'center'},
  ],
});