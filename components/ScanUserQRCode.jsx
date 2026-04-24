import { Text, View, StyleSheet } from "react-native";
import { BlurView } from 'expo-blur';
import UserQRCode from "./UserQRCode";
import Button from "./Button";
import { globalStyles } from "@/styles/styles";

export default function ScanUserQRCode( props ){

    return(
    props.active &&
            <BlurView intensity={20} tint="dark" style={styles.blurContainer}>
                <View style={[styles.scanContainer, globalStyles.boxShadow]}>
                    <Text style={[globalStyles.h3, {textAlign:'center'}]}>Zeskanuj kod QR u baristy</Text>
                    <View>
                        <UserQRCode userUID={props.userUID} size={props.size}/>
                    </View>
                    <Button style={globalStyles.fullButton} buttonText={'Zamknij'} onPress={() => props.setActive(!props.active)}/>
                </View>
            </BlurView>
    )
}

const styles = StyleSheet.create({
    blurContainer:{
        width:'100%',
        height:'100%', 
        position:'absolute',
        zIndex:10,
        padding:24,
    },
    scanContainer: {
        backgroundColor:'#fffcf2',
        borderRadius:22,
        gap:32,
        alignItems:'center',
        justifyContent:'center',
        padding:24,
        top:'50%',
        transform:[{translateY: "-50%"}]
    },
})