import { Text, View, ScrollView, StyleSheet, Pressable, Linking } from "react-native";
import Animated, { LinearTransition } from 'react-native-reanimated';
import { useState, useContext } from "react";
import AuthContext from '../../context/AuthContext';
import { FIREBASE_AUTH } from "../../firebase/FirebaseConfig";
import { updatePassword } from "firebase/auth";
import Screen from "../../pages/Screen";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import { globalStyles } from "../../styles/styles";

const iconPaths = {
  arrow: "M29.994,10.183L15.363,24.812L0.733,10.184c-0.977-0.978-0.977-2.561,0-3.536c0.977-0.977,2.559-0.976,3.536,0 l11.095,11.093L26.461,6.647c0.977-0.976,2.559-0.976,3.535,0C30.971,7.624,30.971,9.206,29.994,10.183z",
  logout: "M569 337C578.4 327.6 578.4 312.4 569 303.1L425 159C418.1 152.1 407.8 150.1 398.8 153.8C389.8 157.5 384 166.3 384 176L384 256L272 256C245.5 256 224 277.5 224 304L224 336C224 362.5 245.5 384 272 384L384 384L384 464C384 473.7 389.8 482.5 398.8 486.2C407.8 489.9 418.1 487.9 425 481L569 337zM224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160z",
  lock : "M256 160L256 224L384 224L384 160C384 124.7 355.3 96 320 96C284.7 96 256 124.7 256 160zM192 224L192 160C192 89.3 249.3 32 320 32C390.7 32 448 89.3 448 160L448 224C483.3 224 512 252.7 512 288L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 288C128 252.7 156.7 224 192 224z",
  info: "M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z",
  contact: "M64 416L64 192C64 139 107 96 160 96L480 96C533 96 576 139 576 192L576 416C576 469 533 512 480 512L360 512C354.8 512 349.8 513.7 345.6 516.8L230.4 603.2C226.2 606.3 221.2 608 216 608C202.7 608 192 597.3 192 584L192 512L160 512C107 512 64 469 64 416z",
  newPassword: "M211.125 180.75v-52.416c0-21.137 17.196-38.334 38.334-38.334h14.082c21.138 0 38.334 17.197 38.334 38.334v52.416h90v-45.375c0-74.646-60.729-135.375-135.375-135.375s-135.375 60.729-135.375 135.375v45.375z M411.475 210.75h-309.951c-16.223 0-29.374 13.151-29.374 29.374v243.501c0 16.223 13.151 29.375 29.375 29.375h309.951c16.223 0 29.374-13.151 29.374-29.374v-243.501c0-16.224-13.152-29.375-29.375-29.375zm-139.975 166.591v53.851c0 8.284-6.716 15-15 15s-15-6.716-15-15v-53.851c-19.267-6.323-33.225-24.469-33.225-45.824 0-26.591 21.634-48.225 48.225-48.225s48.225 21.634 48.225 48.225c0 21.355-13.958 39.501-33.225 45.824z M256.5 313.292c-10.049 0-18.225 8.176-18.225 18.225s8.176 18.225 18.225 18.225 18.225-8.175 18.225-18.225-8.176-18.225-18.225-18.225z",
  instagram: "M510.949219 150.5c-1.199219-27.199219-5.597657-45.898438-11.898438-62.101562-6.5-17.199219-16.5-32.597657-29.601562-45.398438-12.800781-13-28.300781-23.101562-45.300781-29.5-16.296876-6.300781-34.898438-10.699219-62.097657-11.898438-27.402343-1.300781-36.101562-1.601562-105.601562-1.601562s-78.199219.300781-105.5 1.5c-27.199219 1.199219-45.898438 5.601562-62.097657 11.898438-17.203124 6.5-32.601562 16.5-45.402343 29.601562-13 12.800781-23.097657 28.300781-29.5 45.300781-6.300781 16.300781-10.699219 34.898438-11.898438 62.097657-1.300781 27.402343-1.601562 36.101562-1.601562 105.601562s.300781 78.199219 1.5 105.5c1.199219 27.199219 5.601562 45.898438 11.902343 62.101562 6.5 17.199219 16.597657 32.597657 29.597657 45.398438 12.800781 13 28.300781 23.101562 45.300781 29.5 16.300781 6.300781 34.898438 10.699219 62.101562 11.898438 27.296876 1.203124 36 1.5 105.5 1.5s78.199219-.296876 105.5-1.5c27.199219-1.199219 45.898438-5.597657 62.097657-11.898438 34.402343-13.300781 61.601562-40.5 74.902343-74.898438 6.296876-16.300781 10.699219-34.902343 11.898438-62.101562 1.199219-27.300781 1.5-36 1.5-105.5s-.101562-78.199219-1.300781-105.5zm-46.097657 209c-1.101562 25-5.300781 38.5-8.800781 47.5-8.601562 22.300781-26.300781 40-48.601562 48.601562-9 3.5-22.597657 7.699219-47.5 8.796876-27 1.203124-35.097657 1.5-103.398438 1.5s-76.5-.296876-103.402343-1.5c-25-1.097657-38.5-5.296876-47.5-8.796876-11.097657-4.101562-21.199219-10.601562-29.398438-19.101562-8.5-8.300781-15-18.300781-19.101562-29.398438-3.5-9-7.699219-22.601562-8.796876-47.5-1.203124-27-1.5-35.101562-1.5-103.402343s.296876-76.5 1.5-103.398438c1.097657-25 5.296876-38.5 8.796876-47.5 4.101562-11.101562 10.601562-21.199219 19.203124-29.402343 8.296876-8.5 18.296876-15 29.398438-19.097657 9-3.5 22.601562-7.699219 47.5-8.800781 27-1.199219 35.101562-1.5 103.398438-1.5 68.402343 0 76.5.300781 103.402343 1.5 25 1.101562 38.5 5.300781 47.5 8.800781 11.097657 4.097657 21.199219 10.597657 29.398438 19.097657 8.5 8.300781 15 18.300781 19.101562 29.402343 3.5 9 7.699219 22.597657 8.800781 47.5 1.199219 27 1.5 35.097657 1.5 103.398438s-.300781 76.300781-1.5 103.300781zm0 0 M256.449219 124.5c-72.597657 0-131.5 58.898438-131.5 131.5s58.902343 131.5 131.5 131.5c72.601562 0 131.5-58.898438 131.5-131.5s-58.898438-131.5-131.5-131.5zm0 216.800781c-47.097657 0-85.300781-38.199219-85.300781-85.300781s38.203124-85.300781 85.300781-85.300781c47.101562 0 85.300781 38.199219 85.300781 85.300781s-38.199219 85.300781-85.300781 85.300781zm0 0 M423.851562 119.300781c0 16.953125-13.746093 30.699219-30.703124 30.699219-16.953126 0-30.699219-13.746094-30.699219-30.699219 0-16.957031 13.746093-30.699219 30.699219-30.699219 16.957031 0 30.703124 13.742188 30.703124 30.699219zm0 0",
  facebook: "m40.4 55.2c-.3 0-6.9 0-9.9 0-1.6 0-2.1-.6-2.1-2.1 0-4 0-8.1 0-12.1 0-1.6.6-2.1 2.1-2.1h9.9c0-.3 0-6.1 0-8.8 0-4 .7-7.8 2.7-11.3 2.1-3.6 5.1-6 8.9-7.4 2.5-.9 5-1.3 7.7-1.3h9.8c1.4 0 2 .6 2 2v11.4c0 1.4-.6 2-2 2-2.7 0-5.4 0-8.1.1-2.7 0-4.1 1.3-4.1 4.1-.1 3 0 5.9 0 9h11.6c1.6 0 2.2.6 2.2 2.2v12.1c0 1.6-.5 2.1-2.2 2.1-3.6 0-11.3 0-11.6 0v32.6c0 1.7-.5 2.3-2.3 2.3-4.2 0-8.3 0-12.5 0-1.5 0-2.1-.6-2.1-2.1 0-10.5 0-32.4 0-32.7z",
}

const Statistic = ( props ) =>{
  return(
    <View style={props.styles}>
      <Text style={style.statisticsItemText}>{props.value}</Text>
      <Text style={style.statisticsItemHeader}>{props.header}</Text>
    </View>
  );
};

const UserStatistics = () => {

  const { user, userData } = useContext(AuthContext);
  const visits = userData.visits.length;
  const collectedStamps = userData.allTimeStamps;
  const coupons = userData.allTimeCoupons;
  console.log(`Wizyty: ${visits};\n Pieczątki: ${collectedStamps};\n Kupony: ${coupons}`);

  return (
    <View style={[style.statisticsContainer, globalStyles.boxShadow]}>
      <View style={style.statistics}>
        <Statistic styles={[style.statisticsItem, style.statisticsItemBorder]} header='wizyt' value={visits}/>
        <Statistic styles={[style.statisticsItem, style.statisticsItemBorder]} header='pieczątek' value={collectedStamps}/>
        <Statistic styles={style.statisticsItem} header='kuponów' value={coupons}/>
      </View>
    </View>
  );
}

const AccountSettings = ( props ) => {
  const [active,isActive] = useState(false);

  return (
    <View>
      <View style={style.accountSettingsRow}>
        <View style={style.accountSettingsRowElements}>
          <Icon color='#313634' path={props.path}/>
          <Text style={globalStyles.h5}>{props.text}</Text>
        </View>
        <Animated.View style={{transitionDuration: 200, transform:[{rotate: active ? '180deg' : '0deg'}]}}>
          <Pressable onPress={() => isActive(!active)}>
            <Icon width={12} height={12} color='#313634' path={iconPaths.arrow} viewBox="0 0 30.727 30.727"/>
          </Pressable>
        </Animated.View>
      </View>
      <Animated.View style={{height: active ? 'auto' : 0}} layout={LinearTransition.duration(300)}>
        {
        active &&
        props.children
        }
      </Animated.View>
    </View>
  )
}

const Logout = () => {
  return (
    <View>
      <Pressable style={style.accountSettingsLogout} onPress={() => {console.log('signing out...');
    FIREBASE_AUTH.signOut().then(() => console.log('signed out')).catch(e => console.log(e));}}>
          <Icon color='#E01F4A' path={iconPaths.logout}/>
          <Text style={[globalStyles.h5, {color:'#E01F4A'}]}>Wyloguj się</Text>
      </Pressable>
    </View>
  )
}

const changePassword = (user, newPassword) => {
  updatePassword(user, newPassword).then(() => {
  console.log('Uzytkownik zmienił hasło')
  alert('Twoje hasło zostało zmienione')
}).catch((error) => {
  console.log(error)
});
}

const ControlPanel = () => {

  const { user, userData } = useContext(AuthContext);
  const[newPassword, setNewPassword] = useState('');
  
  return (
    <View style={[style.accountSettingsContainer, globalStyles.boxShadow]}>
      <AccountSettings text={'Zmień hasło'} path={iconPaths.lock}>
        <View style={{paddingBottom:12, gap:12}}>
          <Input setValue={password => setNewPassword(password)} placeholder={"Wpisz nowe hasło"} label={"Nowe hasło"} path={iconPaths.newPassword} viewBox={"0 0 513 513"}/>
          <Button onPress={()=> changePassword(user, newPassword)} style={globalStyles.fullButton} buttonText={'Zapisz'} variant="full"/>
        </View>
      </AccountSettings>
      <AccountSettings text={'O programie'} path={iconPaths.info}>
        <View style={{paddingBottom:12}}>
          <View style={style.aboutPrograme}>
            <Text style={style.aboutProgrameSubHeader}>Jak to działa?</Text>
            <Text style={globalStyles.bodyText}>Nasz program lojalnościowy to prosty sposób na oszczędzanie przy każdej wizycie:</Text>
              <Text style={globalStyles.bodyText}>  • Przy każdej wizycie pokazujesz kod QR w aplikacji</Text>
              <Text style={globalStyles.bodyText}>  • Zbierasz pieczątki - jedna kawa = jedna pieczątka</Text>
              <Text style={globalStyles.bodyText}>  • Po zebraniu 7 pieczątek otrzymujesz darmową kawę</Text>
          </View>
          <View style={style.aboutPrograme}>
            <Text style={style.aboutProgrameSubHeader}>Zasady programu</Text>
              <Text style={globalStyles.bodyText}>  • Darmowa kawa to dowolna klasyczna kawa z naszego menu </Text>
              <Text style={globalStyles.bodyText}>  • Kupony na darmową kawę są ważne 3 miesiące</Text>
              <Text style={globalStyles.bodyText}>  • Program dostępny we wszystkich naszych kawiarniach</Text>
          </View>
          <View style={style.aboutPrograme}>
            <Text style={style.aboutProgrameSubHeader}>Twoje korzyści</Text>
              <Text style={globalStyles.bodyText}>  • 8 kawa gratis</Text>
              <Text style={globalStyles.bodyText}>  • Łatwe śledzenie historii wizyt</Text>
          </View> 
          <View style={style.aboutPrograme}>
            <Text style={style.aboutProgrameSubHeader}>Lokalizacje</Text>
            <Text style={globalStyles.bodyText}>Program obowiązuje we wszystkich kawiarniach sieci Kawka Coffee House. Aktualną listę znajdziesz w zakładce "Kawiarnie".</Text>
          </View>
        </View>
      </AccountSettings>
      <AccountSettings text={'Kontakt'} path={iconPaths.contact}>
        <View style={{paddingBottom:12, gap:8}}>
          <View style={{alignItems:'center', gap:12}}>
            <Text style={style.aboutProgrameSubHeader}>Masz pytania? Chętnie pomożemy!</Text>
            <View style={{alignItems:'center'}}>
              <Text style={globalStyles.bodyText}>Napisz do nas 📧</Text>
              <Pressable onPress={()=> Linking.openURL('mailto:kchobiuro@gmail.com?subject=Zapytanie')}>
                <Text style={[globalStyles.bodyText,{color:'#31572c', fontFamily:'Poppins-SemiBold'}]}>kchobiuro@gmail.com</Text>
              </Pressable>
              <Text style={globalStyles.bodyText}>Odpowiadamy w ciągu 24 godzin</Text>
            </View>
            <Text style={[globalStyles.bodyText, {color:'rgba(49,54,52,0.7)'}]}>lub</Text>
          </View>
          <View style={{gap:12}}>
            <Text style={[globalStyles.bodyText,{textAlign:'center'}]}>Znajdź nas w social mediach</Text>
            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
              <Pressable onPress={()=> Linking.openURL('https://www.instagram.com/kawka.oswiecim/')}>
                <Icon width={32} height={32} color='#31572c' path={iconPaths.instagram} viewBox="0 0 511 511.9"/>
              </Pressable>
              <Pressable onPress={()=> Linking.openURL('https://www.instagram.com/kawka_andrychow/')}>
                <Icon width={32} height={32} color='#31572c' path={iconPaths.instagram} viewBox="0 0 511 511.9"/>
              </Pressable>
              <Pressable onPress={()=> Linking.openURL('https://www.facebook.com/kawkacoffeehouse')}>
                <Icon width={32} height={32} color='#31572c' path={iconPaths.facebook} viewBox="0 0 100 100"/>
              </Pressable>
            </View>
          </View>
        </View>
      </AccountSettings>
      
      <Logout />
    </View>
  );
}

export default function Profile() {
  return (
    <Screen 
    headerText={'Twój profil'} 
    subheaderText={'Zarządzaj swoim kontem'}
    >
      <ScrollView>
        <View style={{padding:24, gap:24}}>
          <UserStatistics />
          <ControlPanel />
        </View>  
      </ScrollView> 
    </Screen>
  );
}

const style =  StyleSheet.create({
  statisticsContainer: {
    padding:20,
    backgroundColor:'#fffcf2',
    borderRadius:22,
  },
  statistics: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  statisticsItem: {
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    flex:1,
  },
  statisticsItemBorder: {
    borderRightWidth:2,
    borderRightColor:'rgba(49,87,44,0.5)',
  },
  statisticsItemText: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 40,
    color: '#31572c',
    fontWeight: 'extrabold',
  }, 
    statisticsItemHeader: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#31572c',
  }, 
  accountSettingsRow: {
   flexDirection:'row', 
   alignItems:'center', 
   justifyContent:'space-between', 
   paddingVertical:12,
  },
  accountSettingsRowElements: {
    flexDirection:'row', 
    alignItems:'center', 
    gap:24
  },
  accountSettingsLogout: {
    flexDirection:'row', 
    alignItems:'center', 
    paddingVertical:12, 
    gap:24,
  },
  accountSettingsContainer: {
    padding:20,
    backgroundColor:'#fffcf2',
    borderRadius:22,
  },
  aboutPrograme:{
    paddingVertical:6
  },
  aboutProgrameSubHeader: {
    fontSize:16, 
    fontFamily:'Poppins-SemiBold',
    color:'#313634'
  },
})