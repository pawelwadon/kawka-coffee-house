import { View, Text, StyleSheet, ScrollView, TextInput, Image, Pressable } from 'react-native';
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FIREBASE_DB } from "../../firebase/FirebaseConfig";
import { doc, collection, getDocs, setDoc } from "firebase/firestore";
import Screen from "../../pages/Screen";
import Icon from "../../components/Icon";
import { globalStyles } from "../../styles/styles";
import profilePhoto from "../../assets/images/client-profile-photo.png"

const loupeIconPath = 'M328.263,0C226.788,0.01,144.548,82.25,144.538,183.724c0.004,44.722,16.011,85.68,42.567,117.537l-37.69,37.69 c-0.15,0.15-0.174,0.322-0.316,0.473c-18.601-8.795-41.378-5.979-56.723,9.364L14.67,426.463c-19.54,19.541-19.54,51.314,0,70.854 c19.577,19.577,51.277,19.577,70.854,0l77.707-77.674c15.385-15.385,18.193-38.157,9.348-56.765 c0.147-0.139,0.312-0.161,0.457-0.306l37.69-37.69c31.857,26.555,72.815,42.561,117.537,42.565 c101.475-0.01,183.714-82.25,183.724-183.722C511.977,82.25,429.738,0.01,328.263,0z M328.263,300.638 c-64.517-0.03-116.885-52.398-116.916-116.913c0.03-64.517,52.398-116.887,116.916-116.916 c64.517,0.029,116.885,52.398,116.916,116.916C445.147,248.24,392.78,300.608,328.263,300.638z';

const SearchBar = (props) => {
    return(
        <View style={[styles.searchBar, globalStyles.boxShadow]}>
            <Icon path={loupeIconPath} width={16} height={16} color='rgba(49, 54, 52, 0.6)' viewBox='0 0 512.001 512.001'/>
            <TextInput onChangeText={props.setSpecificClient} placeholder='Szukaj klienta...' style={styles.searchBarInput} />
        </View>
    )
}

const arrowIconPath = 'm64 88c-1.023 0-2.047-.391-2.828-1.172l-40-40c-1.563-1.563-1.563-4.094 0-5.656s4.094-1.563 5.656 0l37.172 37.172 37.172-37.172c1.563-1.563 4.094-1.563 5.656 0s1.563 4.094 0 5.656l-40 40c-.781.781-1.805 1.172-2.828 1.172z';

const ClientAccountDetails = (props) => {

    const router = useRouter();

    return(
        <View style={[styles.clientAccountDetails,globalStyles.boxShadow]}>
            <View>
                <Image source={profilePhoto} resizeMode='contain'/>
            </View>
            <View style={styles.clientAccountDetailsTextContainer}>
                <Text style={globalStyles.h5}>{props.clientName}</Text>
                <Text style={styles.clientAccountDetailsText}>UID: {props.clientUID}</Text>
                <Text style={styles.clientAccountDetailsText}>{props.clientStamps} pieczątek • {props.clientCoupons} kuponów</Text>
            </View>
            <View style={styles.arrowLink}>
                <Pressable onPress={() => router.push(`/clientDetails?uid=${props.UID}`)}>
                    <Icon path={arrowIconPath} width={24} height={24} color='#313634' viewBox='0 0 128 128'/>
                </Pressable>
            </View>
        </View>
    )
}

const ClientsList = (props) => {
    
    return(
        <View style={styles.clientsList}>
            {props.clients.map((value) => <ClientAccountDetails key={value.userUID} clientName={`${value.clientData.name} ${value.clientData.surname}`} clientUID={value.userUID.slice(0,20)} UID={value.userUID} clientStamps={value.clientData.allTimeStamps} clientCoupons={value.clientData.allTimeCoupons}/>)}
        </View>
    )
}

export default function Users() {
    const [specificClient, setSpecificClient] = useState('');
    const [clientData, setClientData] = useState([]);
    
    useEffect(() => {
        const fetchClients = async () => {
            const response = await getDocs(collection(FIREBASE_DB, 'users'));
            const clients = [];
            response.forEach((doc) => {
                clients.push({ userUID: doc.id, clientData: doc.data() });
            });
            setClientData(clients);
        };
        fetchClients();
    }, []);

    const filteredClients = clientData.filter((client) =>
        `${client.clientData.name} ${client.clientData.surname}`
            .toLowerCase()
            .includes(specificClient.toLowerCase())
    );

    return (
    <Screen headerText={'Użytkownicy'} subheaderText={'Twoi klienci'}>
        <ScrollView>
            <View style={{padding:24, gap:24}}>
                <SearchBar setSpecificClient={(text)=> setSpecificClient(text)}/>
                <ClientsList clients={filteredClients}/>
            </View>
        </ScrollView>
    </Screen>
    );
}

const styles = StyleSheet.create({
    searchBar:{
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        gap: 12,
        paddingVertical:12,
        paddingHorizontal: 20,
        backgroundColor:'#fffcf2',
    },
    searchBarInput:{
        flex:1,
        color:'#313634',
        fontFamily:'Poppins-Regular',
    },
    clientAccountDetails:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:20,
        borderRadius:24,
        backgroundColor:'#fffcf2',
        gap:16,
    },
    clientAccountDetailsTextContainer:{
        gap:4,
    },
    clientAccountDetailsText:{
        fontSize:14,
        fontFamily:'Poppins-Regular',
        color:'#313634',
    },
    clientsList:{
        gap:18,
    },
    arrowLink:{
        transform:[{rotate: '-90deg'}],
        right:0,
    },
});