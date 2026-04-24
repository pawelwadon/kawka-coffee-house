import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { useEffect, useState } from "react";
import { FIREBASE_DB } from "../../firebase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Screen from "../../pages/Screen";
import Icon from "../../components/Icon";
import { globalStyles } from "../../styles/styles";

const iconPaths = {
    stamps : 'M61 467v30c0 8.28 6.72 15 15 15h360c8.28 0 15-6.72 15-15v-30z M332.44 176.98c23.06-24.48 32.84-57.75 26.82-91.29-8.7-48.54-51.98-85.69-103.26-85.69-51.87 0-94.68 37.77-103.26 85.69-6.02 33.54 3.76 66.81 26.82 91.29 15.61 16.58 21.39 37.79 23.49 52.66 4.41 31.27-5.07 54.9-16.96 72.36h139.84c-11.9-17.46-21.38-41.11-16.98-72.36 2.1-14.87 7.88-36.08 23.49-52.66z M466 437h-420c-8.284 0-15-6.716-15-15v-15c0-41.355 33.645-75 75-75h300c41.355 0 75 33.645 75 75v15c0 8.284-6.716 15-15 15z',
    coupons : 'm497 206.733c8.284 0 15-6.716 15-15v-37.436c0-46.314-27.65-73.964-73.965-73.964h-86.702v47.133c-.738 19.881-29.269 19.866-30 0v-47.133h-247.368c-46.315 0-73.965 27.651-73.965 73.965v37.436c0 8.284 6.716 15 15 15 65.275 2.48 65.246 96.068-.001 98.533-8.284 0-14.999 6.716-14.999 15v37.436c0 46.314 27.65 73.964 73.965 73.964h247.369v-47.133c.738-19.881 29.269-19.866 30 0v47.133h86.702c46.314 0 73.965-27.65 73.965-73.964v-37.436c0-8.284-6.716-15-15-15-65.275-2.477-65.246-96.071-.001-98.534zm-145.667 113.534c-.738 19.881-29.269 19.866-30 0v-32.133c.738-19.881 29.269-19.866 30 0zm0-96.4c-.738 19.881-29.269 19.866-30 0v-32.133c.738-19.881 29.269-19.866 30 0z',
    users: 'M293.373,226.936h-15v-15c0-8.284-6.716-15-15-15c-8.284,0-15,6.716-15,15v15h-15c-8.284,0-15,6.716-15,15 c0,8.284,6.716,15,15,15h15v15c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15v-15h15c8.284,0,15-6.716,15-15 C308.373,233.652,301.657,226.936,293.373,226.936z M263.373,136.936c-34.485,0-65.14,16.713-84.293,42.463c-7.653-1.61-15.582-2.463-23.707-2.463 c-8.643,0-17.064,0.965-25.165,2.781c-38.121,8.543-69.149,36.066-82.606,72.092c-4.669,12.5-7.229,26.02-7.229,40.127 c0,8.284,6.716,15,15,15h125.596c19.246,24.348,49.03,40,82.404,40c57.898,0,105-47.102,105-105S321.271,136.936,263.373,136.936z M263.373,316.936c-13.592,0-26.339-3.652-37.344-10c-22.48-12.967-37.656-37.236-37.656-65c0-20.01,7.892-38.199,20.708-51.662 c13.67-14.359,32.946-23.338,54.292-23.338c41.355,0,75,33.645,75,75S304.728,316.936,263.373,316.936z M32.622,84.187c0,23.666,18.367,43.109,41.594,44.857c-7.382-13.302-11.594-28.596-11.594-44.857 s4.212-31.556,11.594-44.857C50.989,41.077,32.622,60.521,32.622,84.187z M93.489,160.825c-5.17-1.077-10.482-1.639-15.867-1.639C34.821,159.186,0,194.008,0,236.809 c0,8.284,6.716,15,15,15h1.025C27.627,211.581,56.218,178.487,93.489,160.825z M104.216,47.915c-7.289,10.25-11.594,22.764-11.594,36.271s4.305,26.021,11.594,36.271 c11.383,16.006,30.065,26.478,51.157,26.478c34.601,0,62.75-28.149,62.75-62.75s-28.149-62.75-62.75-62.75 C134.28,21.437,115.599,31.909,104.216,47.915z'
}

const TimeSpan = (props) => {

    return(
        <Pressable style={[styles.timeSpan, {backgroundColor: props.selected ? '#31572C': ''}]} onPress={props.setSelected}>
            <Text style={[styles.selectedTimespan, {color: props.selected ? '#fffcf2' : '#31572C', fontFamily: props.selected ? 'Poppins-Bold' : 'Poppins-Medium'}]}>{props.label}</Text>
        </Pressable>
    );
};

const SelectTimeSpan = (props) => {

    return(
        <View style={styles.selectTimespanContainer}>
            <TimeSpan selected={props.selected === 'Dzień'} setSelected={()=> props.setSelected('Dzień')} label={'Dzień'}/>
            <TimeSpan selected={props.selected === 'Tydzień'} setSelected={()=> props.setSelected('Tydzień')} label={'Tydzień'}/>
            <TimeSpan selected={props.selected === 'Miesiąc'} setSelected={()=> props.setSelected('Miesiąc')} label={'Miesiąc'}/>
        </View>
    );
};

const SelectedStatistics = (props) => {
    return(
        <View style={[globalStyles.boxShadow, styles.selectedStatistics]}>
            <View>
                <Icon path={props.iconPath} width={52} height={52} color='#31572C' viewBox={props.viewBox || '0 0 512 512'}/>
            </View>
            <View>
                <Text style={styles.statisticsCount}>{props.statisticsCount}</Text>
                <Text style={styles.statisticsTitle}>{props.statisticsTitle}</Text>
            </View>
        </View>
    )
};

const ClientsStatistics = (props) =>{
 return(
        <View style={styles.clientsStatistics}>
            <SelectedStatistics iconPath={iconPaths.stamps} statisticsCount={props.stampsCount} statisticsTitle='Dodane pieczątki'/>
            <SelectedStatistics iconPath={iconPaths.coupons} statisticsCount={props.couponsCount} statisticsTitle='Zrealizowane kupony'/>
            <SelectedStatistics iconPath={iconPaths.users} statisticsCount={props.usersCount} statisticsTitle='Nowi użytkownicy' viewBox='0 0 368.373 368.373'/>
        </View>
    )
};

const LastActivities = (props) => {
    return(
        <View>
            <Text style={globalStyles.h2}>Ostatnie operacje</Text>
            <View style={[styles.lastActivities, globalStyles.boxShadow]}>
                <ScrollView contentContainerStyle={{gap:4}}>
                    {props.activitiesLog.map((log,index)=> <Text key={index} style={[styles.activitiesLog, index < props.activitiesLog.length - 1 ? styles.activitiesLogBorder : null]}>{log.log.client.split(' ')[0] + ' ' + log.log.client.split(' ')[1][0] + '.'} - {log.log.activity} ({log.log.dateOfVisit.toDate().toLocaleTimeString()})</Text>)}
                </ScrollView>
            </View>
        </View>
    )
}

export default function Statistics() {

    const [selected, setSelected] = useState('');
    const [clientsActivities, setClientsActivities] = useState([]);

    useEffect(()=>{
        const getClientsActivities = async () => {
            const response = await getDocs(collection(FIREBASE_DB, 'history'));
            const logs = [];
            response.forEach((doc) => {
                logs.push({log:doc.data()});
            });
            setClientsActivities(logs);
        };
        getClientsActivities();
    }, []);

    const now = new Date();
    let startDate;

    if (selected === 'Dzień') {
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (selected === 'Tydzień') {
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
    } else if (selected === 'Miesiąc') {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    const filtered = clientsActivities.filter((logs) => {
        if (selected === '') return true;
        const visitDate = logs.log.dateOfVisit.toDate();
        return visitDate >= startDate;
    });

    const stampsCount = filtered
    .filter((logs)=> logs.log.type === 'stamp')
    .reduce((sum, logs) => sum + logs.log.count, 0);

    const couponsCount = filtered
    .filter((logs)=> logs.log.type === 'coupon')
    .length

    const usersCount = filtered
    .filter((logs)=> logs.log.type === 'registration')
    .length;


    return (
    <Screen headerText={'Statystyki'} subheaderText={'Podsumowanie aktywności'}>
        <ScrollView>
            <View style={{padding:24, gap:24}}>
                <SelectTimeSpan selected={selected} setSelected={setSelected}/>
                <ClientsStatistics stampsCount={stampsCount} couponsCount={couponsCount} usersCount={usersCount}/>
                <LastActivities activitiesLog={clientsActivities}/>
            </View>
        </ScrollView>
    </Screen>
    );
};

const styles = StyleSheet.create({
    timeSpan:{
        flex:1,
        paddingVertical: 6,
        borderRadius:14,
        borderWidth:2,
        borderColor:'#31572C',
        alignItems:'center',
    },
    selectedTimespan:{
        fontSize: 18,
    },
    selectTimespanContainer:{
        flex:3,
        flexDirection:'row',
        justifyContent:'space-between',
        gap:12,
    },
    selectedStatistics:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fffcf2',
        borderRadius:24,
        gap:32,
        paddingHorizontal:20,
        paddingVertical:10,
    },
    statisticsCount:{
        fontSize:48,
        lineHeight:60,
        fontFamily:'Poppins-ExtraBold',
        color:'#313634'
    },
    statisticsTitle:{
        fontSize:18,
        fontFamily:'Poppins-Medium',
        color:'#313634'
    },
    clientsStatistics:{
        gap:18,
    },
    lastActivities:{
        height:136,
        borderRadius:20,
        paddingHorizontal:20,
        paddingVertical:10,
        backgroundColor:'#fffcf2',
        marginTop:22,
    },
    activitiesLog:{
        fontSize:14,
        fontFamily:'Poppins-Regular',
        color:'#313634',
    },
    activitiesLogBorder:{
        borderBottomWidth:0.5,
        borderBottomColor:'rgba(49, 54, 52, 0.6)'
    }
})