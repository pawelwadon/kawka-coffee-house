import { StyleSheet } from 'react-native';
import { globalStyles } from "../../styles/styles";
import { Text, View, ScrollView, Image } from "react-native";
import Screen from "../../pages/Screen";
import Icon from "../../components/Icon";


export default function Profile() {

  const UserStatistics =() => {
    let visits = 0;
    let collectedStamps = 0;
    let coupons = 0;

    return (
      <View style={[style.statisticsContainer, globalStyles.boxShadow]}>
        <View style={style.statistics}>
          <View style={[style.statisticsItem, style.statisticsItemBorder]}>
            <Text style={style.statisticsItemText}>{visits}</Text>
            <Text style={style.statisticsItemHeader}>wizyt</Text>
          </View>
          <View style={[style.statisticsItem, style.statisticsItemBorder]}>
            <Text style={style.statisticsItemText}>{collectedStamps}</Text>
            <Text style={style.statisticsItemHeader}>pieczątek</Text>
          </View>
          <View style={style.statisticsItem}>
            <Text style={style.statisticsItemText}>{coupons}</Text>
            <Text style={style.statisticsItemHeader}>kuponów</Text>
          </View>
        </View>
      </View>
    );
  }

  const ControlPanel = () => {

    const AccountSettings = ({ text, path }) => {
      return (
        <View>
          <View style={style.accountSettingsRow}>
            <View style={style.accountSettingsRowElements}>
              <Icon color='#313634' path={path}/>
              <Text style={globalStyles.h5}>{text}</Text>
            </View>
              <Icon width={12} height={12} color='#313634' path="M29.994,10.183L15.363,24.812L0.733,10.184c-0.977-0.978-0.977-2.561,0-3.536c0.977-0.977,2.559-0.976,3.536,0 l11.095,11.093L26.461,6.647c0.977-0.976,2.559-0.976,3.535,0C30.971,7.624,30.971,9.206,29.994,10.183z" viewBox="0 0 30.727 30.727"/>
          </View>
          {/* <View>{children}</View> */}
        </View>
      )
    }

    const Logout = () => {
      return (
        <View>
          <View style={style.accountSettingsLogout}>
              <Icon color='#E01F4A' path="M569 337C578.4 327.6 578.4 312.4 569 303.1L425 159C418.1 152.1 407.8 150.1 398.8 153.8C389.8 157.5 384 166.3 384 176L384 256L272 256C245.5 256 224 277.5 224 304L224 336C224 362.5 245.5 384 272 384L384 384L384 464C384 473.7 389.8 482.5 398.8 486.2C407.8 489.9 418.1 487.9 425 481L569 337zM224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160z"/>
              <Text style={[globalStyles.h5, {color:'#E01F4A'}]}>Wyloguj się</Text>
          </View>
        </View>
      )
    }

    return (
      <View style={[style.accountSettingsContainer, globalStyles.boxShadow]}>
        <AccountSettings text={'Edytuj profil'} path={"M256.1 312C322.4 312 376.1 258.3 376.1 192C376.1 125.7 322.4 72 256.1 72C189.8 72 136.1 125.7 136.1 192C136.1 258.3 189.8 312 256.1 312zM226.4 368C127.9 368 48.1 447.8 48.1 546.3C48.1 562.7 61.4 576 77.8 576L274.3 576L285.2 521.5C289.5 499.8 300.2 479.9 315.8 464.3L383.1 397C355.1 378.7 321.7 368.1 285.7 368.1L226.3 368.1zM332.3 530.9L320.4 590.5C320.2 591.4 320.1 592.4 320.1 593.4C320.1 601.4 326.6 608 334.7 608C335.7 608 336.6 607.9 337.6 607.7L397.2 595.8C409.6 593.3 421 587.2 429.9 578.3L548.8 459.4L468.8 379.4L349.9 498.3C341 507.2 334.9 518.6 332.4 531zM600.1 407.9C622.2 385.8 622.2 350 600.1 327.9C578 305.8 542.2 305.8 520.1 327.9L491.3 356.7L571.3 436.7L600.1 407.9z"}/>
        <AccountSettings text={'Zmień hasło'} path={"M256 160L256 224L384 224L384 160C384 124.7 355.3 96 320 96C284.7 96 256 124.7 256 160zM192 224L192 160C192 89.3 249.3 32 320 32C390.7 32 448 89.3 448 160L448 224C483.3 224 512 252.7 512 288L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 288C128 252.7 156.7 224 192 224z"}/>
        <AccountSettings text={'O programie'} path={"M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z"}/>
        <AccountSettings text={'Kontakt'} path={"M64 416L64 192C64 139 107 96 160 96L480 96C533 96 576 139 576 192L576 416C576 469 533 512 480 512L360 512C354.8 512 349.8 513.7 345.6 516.8L230.4 603.2C226.2 606.3 221.2 608 216 608C202.7 608 192 597.3 192 584L192 512L160 512C107 512 64 469 64 416z"}/>
        <Logout />
      </View>
    );
  }

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
  }
})