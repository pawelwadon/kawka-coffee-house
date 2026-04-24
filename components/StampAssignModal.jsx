import { View, Text, StyleSheet, Pressable } from 'react-native'
import { BlurView } from 'expo-blur';
import Button from "./Button";
import { globalStyles } from "../styles/styles";

export default function StampAssignModal ({ active, setActive, userCurrentStamps, userName, count, setCount, setUserUID, addStamps }){

    const stamps = Array(8).fill(null).map((_, index) => (
        <View key={index} style={styles.stampHolder}>
        {index < userCurrentStamps ? <View style={styles.activeStamp}/> : null}
        </View>
    ));

    return(
    active &&
        <BlurView intensity={20} tint="dark" style={styles.blurContainer}>
            <View style={[styles.scanContainer, globalStyles.boxShadow]}>
                <Text style={[globalStyles.h3, {textAlign:'center'}]}>{userName}</Text>
                <View style={styles.stampsContainer}>
                    {stamps}
                </View>
                <View style={styles.buttonBox}>
                    <Pressable onPress={() => setCount(count - 1)} style={styles.countButton}><Text style={globalStyles.h3}> - </Text></Pressable>
                    <View style={styles.count}>
                        <Text style={globalStyles.h3}>{count}</Text>
                    </View>
                    <Pressable onPress={() => setCount(count + 1)} style={styles.countButton}><Text style={globalStyles.h3}> + </Text></Pressable>
                </View>
                
                <View style={styles.buttonBox}>
                    <Button style={[globalStyles.emptyButton, globalStyles.buttonFlex]} buttonText={'Anuluj'} onPress={() => {setActive(!active); setUserUID && setUserUID('');}} variant='empty'/>
                    <Button style={[globalStyles.fullButton, globalStyles.buttonFlex]} buttonText={'Dodaj'} onPress={addStamps}/>
                </View>
            </View>
        </BlurView>
    )
}

const styles = StyleSheet.create({
    stampHolder:{
        width:30, 
        height:30, 
        borderWidth:2, 
        borderColor:'#31572c', 
        borderRadius:40
    },
    activeStamp:{
        flex:1,
        backgroundColor:'#31572c',
        borderRadius:40,
    },
    blurContainer:{
        width:'100%',
        height:'100%', 
        position:'absolute',
        zIndex:100,
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
        transform:[{translateY: "-50%"}],
    },
    countButton:{
        borderWidth:2,
        borderColor:'#31572c',
        borderRadius:30,
        paddingHorizontal:4
    },
    buttonBox:{
        alignItems:'center', 
        justifyContent:'space-beetween', 
        flexDirection:'row', 
        gap:22
    },
    stampsContainer:{
        flexDirection:'row',
        gap:6
    },
    count:{
        width:60,
        justifyContent:'center',
        alignItems:'center'
    },
})