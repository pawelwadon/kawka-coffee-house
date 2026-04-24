import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useEffect, useState } from "react";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { BlurView } from 'expo-blur';
import { FIREBASE_DB } from "../../firebase/FirebaseConfig";
import { doc, updateDoc, increment, getDoc, arrayUnion } from "firebase/firestore";
import { addStamps } from '../../firebase/addStamps';
import Screen from "../../pages/Screen";
import StampAssignModal from '../../components/StampAssignModal';
import ButtonWithIcon from "../../components/ButtonWithIcon";
import Button from "../../components/Button";
import { globalStyles } from "../../styles/styles";

const QRIcon = 'M226,0H15C6.716,0,0,6.716,0,15v211c0,8.284,6.716,15,15,15h211c8.284,0,15-6.716,15-15V15C241,6.716,234.284,0,226,0z M211,211H30V30h181V211z M497,0H286c-8.284,0-15,6.716-15,15v211c0,8.284,6.716,15,15,15h211c8.284,0,15-6.716,15-15V15C512,6.716,505.284,0,497,0z M482,211H301V30h181V211z M436,61h-90c-8.284,0-15,6.716-15,15v90c0,8.284,6.716,15,15,15h90c8.284,0,15-6.716,15-15V76C451,67.716,444.284,61,436,61z M421,151h-60V91h60V151z M166,61H76c-8.284,0-15,6.716-15,15v90c0,8.284,6.716,15,15,15h90c8.284,0,15-6.716,15-15V76C181,67.716,174.284,61,166,61z M151,151H91V91h60V151z M166,331H76c-8.284,0-15,6.716-15,15v90c0,8.284,6.716,15,15,15h90c8.284,0,15-6.716,15-15v-90C181,337.716,174.284,331,166,331z M151,421H91v-60h60V421z M226,271H15c-8.284,0-15,6.716-15,15v211c0,8.284,6.716,15,15,15h211c8.284,0,15-6.716,15-15V286C241,277.716,234.284,271,226,271z M211,482H30V301h181V482z M497,361c-8.284,0-15,6.716-15,15v45h-76c-8.284,0-15,6.716-15,15v46h-90v-46c0-8.284-6.716-15-15-15s-15,6.716-15,15v61c0,8.284,6.716,15,15,15h120c8.284,0,15-6.716,15-15v-46h76c8.284,0,15-6.716,15-15v-60C512,367.716,505.284,361,497,361z M376,271h-90c-8.284,0-15,6.716-15,15v90c0,8.284,6.716,15,15,15s15-6.716,15-15v-75h60v15c0,8.284,6.716,15,15,15s15-6.716,15-15v-30C391,277.716,384.284,271,376,271z M497,271h-61c-8.284,0-15,6.716-15,15v75.199l-74.999-0.003c-8.284,0-15,6.515-15,14.799c0,0.001,0,0.002,0,0.003s0,0.002,0,0.003v60c0,8.284,6.716,15,15,15s15-6.716,15-15v-45.004L435.999,391c3.979,0,7.794-1.581,10.607-4.393C449.419,383.794,451,379.979,451,376v-75h46c8.284,0,15-6.716,15-15S505.284,271,497,271z M497,482h-31c-8.284,0-15,6.716-15,15s6.716,15,15,15h31c8.284,0,15-6.716,15-15S505.284,482,497,482z';

const getClientData = async (userUID, setUserName, setUserCurrentStamps) => {
    try{
        const response = await getDoc(doc(FIREBASE_DB, 'users', userUID));
        const userData= response.data();   
        setUserName(`${userData.name} ${userData.surname}`);
        setUserCurrentStamps(userData.stamps);
    }catch(error){
        console.log(error)
    };
}

const QRCodeScaner = (props) => {
    
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [scanning, setScanning] = useState(false);

    useEffect(() => {
        requestPermission();
    }, []);
  
    const handleScan = (result) => {
        setScanned(true);
        props.setUserUID(result.data)
        setScanning(false);
    };

    if (!permission || !permission.granted) {
    return (
        <View>
            <Text>Brak dostępu do kamery</Text>
            <Button onPress={requestPermission} buttonText="Przyznaj dostęp" style={globalStyles.fullButton}/>
        </View>
    );
    }

    return(
        <View style={[styles.scaner, globalStyles.boxShadow]}>
            <View style={styles.cameraContainer}>
                <CameraView style={styles.camera} facing="back" barcodeScannerSettings={{barcodeTypes: ['qr'],}} onBarcodeScanned={scanning ? handleScan : undefined}/>
            </View>
            <View style={styles.buttonBox}>
                <ButtonWithIcon onPress={() => {setScanned(false); setScanning(true);} } buttonText={'Skanuj kod'} style={globalStyles.fullButton} path={QRIcon} color={'#fffcf2'} width={30} height={30}/>
            </View>
        </View>
    )
}

export default function Scaner() {

    const [userUID, setUserUID] = useState('');
    const [active, setActive] = useState(false);
    const [count, setCount] = useState(1);
    const [userName, setUserName] = useState('');
    const [userCurrentStamps, setUserCurrentStamps] = useState(0);

    useEffect(() => {
    if (userUID !== '') {
        getClientData(userUID, setUserName, setUserCurrentStamps);
        setActive(true);
    }
    }, [userUID]);

    return (
    <>
    {userUID != '' && <StampAssignModal userName={userName} active={active} setActive={setActive} count={count} setCount={setCount} addStamps={() => addStamps(userUID, setCount, count, userName)} userCurrentStamps={userCurrentStamps} setUserUID={setUserUID}/>}
    <Screen headerText={'Skaner'} subheaderText={'Zeskanuj kod klienta'}>
        <View style={{gap:24, padding:24}}>
            <QRCodeScaner setUserUID={setUserUID}/>
        </View>  
    </Screen>
    </>
  )
}

const styles = StyleSheet.create({
    scaner: {
        backgroundColor:'#fffcf2',
        borderRadius:22,
        padding:20,
        position:'relative',
        justifyContent: 'center',
        alignItems:'center',
    },
    cameraContainer: {
        marginBottom: 26,
        width: '100%',
        height: 325,
        justifyContent: 'center',
        borderColor: '#31572c',
        borderWidth: 8,
        borderRadius: 22,
    },
    camera: {
        flex: 1,
        borderRadius: 14,
    },
    buttonBox:{
        position:'absolute',
        bottom:-26,
    },
})