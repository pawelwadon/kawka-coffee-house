import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FIREBASE_DB } from "../../firebase/FirebaseConfig";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { addStamps } from '../../firebase/addStamps';
import ScreenBackground from "../../components/ScreenBackground";
import StampAssignModal from '../../components/StampAssignModal';
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import { globalStyles } from "../../styles/styles";

const arrowIconPath = 'm64 88c-1.023 0-2.047-.391-2.828-1.172l-40-40c-1.563-1.563-1.563-4.094 0-5.656s4.094-1.563 5.656 0l37.172 37.172 37.172-37.172c1.563-1.563 4.094-1.563 5.656 0s1.563 4.094 0 5.656l-40 40c-.781.781-1.805 1.172-2.828 1.172z';

const Statistic = ( props ) =>{
  return(
    <View style={props.styles}>
      <Text style={styles.statisticsItemText}>{props.value}</Text>
      <Text style={styles.statisticsItemHeader}>{props.header}</Text>
    </View>
  );
};

const ClienstAllTimeStatistics = (props) => {
  return (
    <View style={[styles.statisticsContainer, globalStyles.boxShadow]}>
      <View style={styles.statistics}>
        <Statistic styles={[styles.statisticsItem, styles.statisticsItemBorder]} header='wizyt' value={props.visits}/>
        <Statistic styles={[styles.statisticsItem, styles.statisticsItemBorder]} header='pieczątek' value={props.collectedStamps}/>
        <Statistic styles={styles.statisticsItem} header='kuponów' value={props.coupons}/>
      </View>
    </View>
  );
};


const Activities = (props) => {
  return(
    <View style={styles.activities}>
      <View>
        <Icon path={props.iconPath} color='#31572C' width={54} height={54} viewBox='0 0 512 512'/>
      </View>
      <View style={styles.activityLog}>
        <Text style={styles.date}>{props.date}</Text>
        <Text style={styles.activity}>{props.activity}</Text>
      </View>
    </View>
  )
}

const iconsPath = {
  stamp : 'm406 332h-53.421c-27.587-27.228-50.282-55.148-43.626-102.36 2.097-14.873 7.873-36.08 23.485-52.652 23.064-24.482 32.843-57.759 26.829-91.297-8.728-48.67-52.12-85.692-103.267-85.691-.001 0 .001 0-.001 0-51.715 0-94.645 37.606-103.267 85.689-6.014 33.539 3.765 66.815 26.829 91.297 15.612 16.572 21.389 37.78 23.485 52.652 6.768 48.006-17.562 76.635-43.626 102.361h-53.42c-41.355 0-75 33.645-75 75v30c0 8.284 6.716 15 15 15h15v45c0 8.284 6.716 15 15 15h360c8.284 0 15-6.716 15-15v-45h15c8.284 0 15-6.716 15-15v-30c0-41.354-33.645-74.999-75-74.999zm-173.246-106.549c-3.879-27.505-14.722-51.377-31.356-69.035-16.48-17.494-23.455-41.343-19.136-65.431 6.234-34.768 37.934-60.985 73.738-60.985s67.504 26.217 73.738 60.984c4.319 24.088-2.655 47.937-19.136 65.431-16.635 17.658-27.478 41.53-31.356 69.036-5.391 38.247 4.752 74.262 31.804 106.548h-110.1c27.048-32.282 37.193-68.312 31.804-106.548zm188.246 256.549h-330v-30h330zm30-60c-12.631 0-373.057 0-390 0v-15c0-24.813 20.187-45 45-45h300c24.813 0 45 20.187 45 45z',
  coupon:'M336.333 176.733c-8.284 0-15 6.716-15 15v32.133c.738 19.881 29.269 19.866 30 0v-32.133c0-8.284-6.715-15-15-15z M336.333 273.133c-8.284 0-15 6.716-15 15v32.133c.738 19.881 29.269 19.866 30 0v-32.133c0-8.284-6.715-15-15-15z M497 206.733c8.284 0 15-6.716 15-15v-37.436c0-46.314-27.65-73.964-73.965-73.964h-364.07c-46.315 0-73.965 27.651-73.965 73.965v37.436c0 8.284 6.716 15 15 15 65.275 2.48 65.246 96.068-.001 98.533-8.284 0-14.999 6.716-14.999 15v37.436c0 46.314 27.65 73.964 73.965 73.964h364.07c46.314 0 73.965-27.65 73.965-73.964v-37.436c0-8.284-6.716-15-15-15-65.274-2.477-65.245-96.071 0-98.534zm-15 127.11v23.859c0 29.994-13.97 43.964-43.965 43.964h-86.702v-17.133c-.738-19.881-29.269-19.866-30 0v17.133h-247.368c-29.995.001-43.965-13.97-43.965-43.964v-23.859c85.163-17.728 85.104-137.991 0-155.687v-23.859c0-29.994 13.97-43.964 43.965-43.964h247.369v17.133c.738 19.881 29.269 19.866 30 0v-17.133h86.702c29.995 0 43.965 13.97 43.965 43.964v23.859c-85.164 17.729-85.105 137.992-.001 155.687z'
}


const ClientActivities = (props) => {
  return(
    <View style={styles.clientActivities}>
      <ScrollView contentContainerStyle={{gap:24}}>
        {props.visits.map((visit, index) => (
          <Activities key={index} iconPath={visit.type === 'stamp' ? iconsPath.stamp : iconsPath.coupon} date={visit.dateOfVisit} activity={visit.type === 'stamp' ? `Dodano ${visit.collectedStamps} pieczątek` : 'Zrealizowano kupon'}/>
        ))}
      </ScrollView>
    </View>
  )
}

export default function ClientDetails() {
  
  const { uid } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [clientData, setClientData] = useState({
    clientName:'',
    clientsAllStamps:0,
    clientsCoupons:0,
    clientsVisits:0,
  })
  const [activityHistory, setActivityHistory] = useState([]);
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const getClientDetails = async () => {
      setLoading(true);
      try{
        const response = await getDoc(doc(FIREBASE_DB, 'users', uid));
        const clientData= response.data();
        setClientData({
          clientName: `${clientData.name} ${clientData.surname}`,
          clientCurrentStamps: clientData.stamps,
          clientsAllStamps: clientData.allTimeStamps,
          clientsCoupons: clientData.allTimeCoupons,
          clientsVisits: clientData.visits.length,
        })
        setActivityHistory(clientData.visits)
      }catch(error){
        console.log(error)
      }finally{
        setLoading(false)
      }
    };
    getClientDetails();
  }, [uid]);

  const sortActivityHistory = activityHistory.toReversed()

  if (loading) return <ScreenBackground/>
  
  return (
    <>
    {active && <StampAssignModal userName={clientData.clientName} active={active} setActive={setActive} count={count} setCount={setCount} addStamps={() => addStamps(uid, setCount, count, clientData.clientName)} userCurrentStamps={clientData.clientCurrentStamps}/>}
    <ScreenBackground>
      <View style={{gap:24, padding:24}}>
        <View style={{flexDirection:'row', position:'relative'}}>
          <View style={styles.backButton}>
            <Link href='/users' >
              <Icon path={arrowIconPath} width={40} height={40} color='#313634' viewBox='0 0 128 128'/>
            </Link>
          </View>
          <View style={styles.headerPosition}>
            <Text style={styles.clientName}>{clientData.clientName}</Text>
          </View>
        </View>
        <ClienstAllTimeStatistics visits={clientData.clientsVisits} collectedStamps={clientData.clientsAllStamps} coupons={clientData.clientsCoupons}/>
        <View>
          <Text style={globalStyles.h2}>Historia aktywności</Text>
          <ClientActivities visits={sortActivityHistory}/>
        </View>
        <Button onPress={()=> setActive(true)} buttonText='Dodaj pieczątki ręcznie' style={globalStyles.emptyButton} variant='empty'/>
      </View>
    </ScreenBackground>
    </>
  )
}

const styles = StyleSheet.create({
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
  activities:{
    flexDirection:'row',
    alignItems:'center',
    gap:12,
  },
  activityLog:{
    gap:8,
  },
  date:{
    fontSize:14,
    fontFamily:'Poppins-Regular',
    color: 'rgba(49, 54, 52, 0.6)',
  },
  activity:[
    globalStyles.h5,
    {fontFamily:'Poppins-SemiBold'},
  ],
  clientActivities:[
    {height:250,
    padding:20,
    borderRadius:22,
    backgroundColor:'#fffcf2',
    gap:20,
    marginTop:18,},
    globalStyles.boxShadow
  ],
  headerPosition:{
    position:'absolute',
    left:'50%',
    transform:[{translateX: '-50%'}],
  },
  clientName:{
    fontSize:32,
    fontFamily:'Poppins-SemiBold',
    letterSpacing:-1,
    color:'#31572C',
  },
  backButton:{
    width:44,
    height:44,
    justifyContent:'flex-end',
    alignItems:'center',
    backgroundColor:'#fffcf2',
    borderRadius:32,
    transform:[{rotate: '90deg'}],
    borderWidth:1,
    borderColor:'rgba(234, 220, 193, 0.4)',
  },
})