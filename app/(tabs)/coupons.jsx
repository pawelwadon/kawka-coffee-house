import { Text, View, ScrollView, StyleSheet, ImageBackground } from "react-native";
import { useContext } from "react";
import AuthContext from '../../context/AuthContext';
import { FIREBASE_DB } from "../../firebase/FirebaseConfig";
import { doc, updateDoc, arrayRemove, increment, arrayUnion } from "firebase/firestore";
import { addVisitsHistory } from '../../firebase/addVisitsHistory';
import SwipeButton from 'rn-swipe-button';
import Screen from "../../pages/Screen";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import { globalStyles } from "../../styles/styles";
import couponStructure from '../../assets/images/karta-na-pieczatki.png';

let iconPath = "M109.575,0C49.156,0,0.002,49.155,0.002,109.576c0,60.419,49.154,109.574,109.573,109.574s109.573-49.155,109.573-109.574 C219.148,49.155,169.994,0,109.575,0z M109.575,204.15c-52.148,0-94.573-42.426-94.573-94.574C15.002,57.427,57.427,15,109.575,15 s94.573,42.427,94.573,94.576C204.148,161.725,161.723,204.15,109.575,204.15z M124.29,62.645c-2.929-2.928-7.678-2.928-10.606,0c-2.929,2.93-2.929,7.678,0,10.607l28.821,28.82l-83.457,0.008 c-4.143,0-7.5,3.358-7.5,7.501c0,4.142,3.358,7.499,7.5,7.499l83.46-0.008l-28.827,28.825c-2.929,2.929-2.929,7.678,0,10.606 c1.464,1.465,3.384,2.197,5.303,2.197c1.919,0,3.839-0.732,5.303-2.196l41.629-41.627c1.407-1.407,2.197-3.314,2.197-5.304 c0-1.989-0.79-3.897-2.197-5.304L124.29,62.645z";

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

const handleRedeem = (user, date, userName) => {
  alert('Twój kupon został wykorzystany');
  redeemCoupon(user, date, userName);
};

const ThumbIcon = () => (
  <Icon path={iconPath} viewBox='0 0 219.15 219.15' height={30} width={30} />
);

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
          <SwipeButton title="Przesuń, aby odebrać" onSwipeSuccess={() => handleRedeem(props.user, props.date, props.userName)} swipeSuccessThreshold={90} thumbIconComponent={ThumbIcon} railBackgroundColor="#fffcf2" containerStyles={{borderWidth: 2, margin:0}} railBorderColor="#31572c" thumbIconBackgroundColor="#31572c" thumbIconBorderColor="#31572c" titleColor="#31572c" height={40} railFillBackgroundColor="#31572c" railFillBorderColor="#31572c" titleStyles={{fontFamily: "Poppins-Bold", fontSize: 18, color: "#31572c", width: "100%", textAlign: "right", paddingRight:12}}/>
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