import { ScrollView, Text, View, Linking, StyleSheet } from "react-native";
import Screen from "../../pages/Screen";
import { globalStyles } from "../../styles/styles";
import ButtonWithIcon from "../../components/ButtonWithIcon";

// const OpeningHours = [
//   {day: 'Poniedziałek', hours: "8:00 - 20:00"},
//   {day: 'Wtorek', hours: "8:00 - 20:00"},
//   {day: 'Środa', hours: "8:00 - 20:00"},
//   {day: 'Czwartek', hours: "8:00 - 20:00"},
//   {day: 'Piątek', hours: "8:00 - 20:00"},
//   {day: 'Sobota', hours: "10:00 - 18:00"},
//   {day: 'Niedziela', hours: "8:00 - 18:00"},
// ]; 

const OpeningHours = ({day, hours})=>{
  return(
    <View style={style.timeTable}>
      <Text style={globalStyles.bodyText}>{day}</Text>
      <Text style={globalStyles.bodyText}>{hours}</Text>
    </View>
  )
};

const TimeTable = ({day, hours}) => {}

const CaffeteriaDetails = ({ caffeteriaName, caffeteriaAddress, localization, phoneNumber }) => {

return (
  <View style={[style.cafeteriaContainer, globalStyles.boxShadow]}>
    <View>
      <Text style={globalStyles.h5}>{caffeteriaName}</Text>
      <Text style={globalStyles.bodyText}>{caffeteriaAddress}</Text>
        <View style={style.buttonContainer}>
          <ButtonWithIcon style={[globalStyles.fullButton, globalStyles.buttonFlex]} buttonText={'Kierunek'} onPress={() => Linking.openURL(localization)} color="#fffcf2" path="M541.9 139.5C546.4 127.7 543.6 114.3 534.7 105.4C525.8 96.5 512.4 93.6 500.6 98.2L84.6 258.2C71.9 263 63.7 275.2 64 288.7C64.3 302.2 73.1 314.1 85.9 318.3L262.7 377.2L321.6 554C325.9 566.8 337.7 575.6 351.2 575.9C364.7 576.2 376.9 568 381.8 555.4L541.8 139.4z" variant="full"/>
          <ButtonWithIcon style={[globalStyles.emptyButton, globalStyles.buttonFlex]} buttonText={'Zadzwoń'} onPress={() => Linking.openURL(`tel:${phoneNumber}`)} color="#31572c" path="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z" variant="empty"/>
        </View>
    </View>
    <View>
      <Text style={[globalStyles.bodyText, {marginVertical:16, textAlign:'center'}]}>Godziny otwarcia</Text>
      <OpeningHours day={"Poniedziałek"} hours={"8:00 - 18:00"}/>
      <OpeningHours day={"Wtorek"} hours={"8:00 - 18:00"}/>
      <OpeningHours day={"Środa"} hours={"8:00 - 18:00"}/>
      <OpeningHours day={"Czwartek"} hours={"8:00 - 18:00"}/>
      <OpeningHours day={"Piątek"} hours={"8:00 - 18:00"}/>
      <OpeningHours day={"Sobota"} hours={"8:00 - 18:00"}/>
      <OpeningHours day={"Niedziela"} hours={"8:00 - 18:00"}/>
    </View>
  </View>
);};

export default function Cafeterias() {
  return (
    <Screen 
      headerText={'Wpadnij do nas'} 
      subheaderText={'Czekamy na Ciebie'}
    >
      <ScrollView>
        <View style={{gap:24, padding:24}}>
          <CaffeteriaDetails caffeteriaName={'Kawka Coffee House Oświęcim'} caffeteriaAddress={'Mayzla 1, 32-600 Oświęcim'} localization={'https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=pl&sa=X&geocode=KU_RMLPblRZHMVdA0OsUZqFJ&daddr=Adama+Mickiewicza+10,+32-600+O%C5%9Bwi%C4%99cim'} phoneNumber={'506142276'}/>
          <CaffeteriaDetails caffeteriaName={'Kawka Coffee House Andrychów'} caffeteriaAddress={'Krakowska 146E, 34-120 Andrychów'} localization={'https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=pl&sa=X&geocode=KQdpv-eXhRZHMWVSoUzDFd-V&daddr=Krakowska+146E,+34-120+Andrych%C3%B3w'} phoneNumber={'506142276'}/>
        </View>
      </ScrollView>
    </Screen>
  );
}

const style =  StyleSheet.create({
  cafeteriaContainer: {
    backgroundColor:'#fffcf2',
    padding :20, 
    borderRadius:22,
  },
  buttonContainer: {
    marginTop:18,
    display:'flex',
    alignItems:'center',
    justifyContent:'space-beetween',
    flexDirection:'row',
    gap:22
  },
  timeTable: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
})