import { StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import Icon from "./Icon";

export default function Input( props ) {

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputLabel}>
        <Text style={{ color: "#31572C", fontFamily:'Poppins-Regular' }}>{props.label}</Text>
      </View>
      <View style={styles.input}>
        <Icon width={12} height={12} color="#31572C" path={props.path} viewBox={props.viewBox}/>
        <TextInput placeholder={props.placeholder} style={{ flex: 1, fontFamily:'Poppins-Medium', color:'#313634' }} onChangeText={props.setValue} secureTextEntry={false || props.secureTextEntry} autoCapitalize='none' placeholderTextColor='rgba(49,54,52,0.6)' selectionColor='#31572c'/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    gap: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#31572C",
  },
  inputContainer: {
    position: "relative",
    paddingVertical: 10,
  },
  inputLabel: {
    position: "absolute",
    top: 0,
    left: 10,
    width: "auto",
    backgroundColor: "#fffcf2",
    zIndex: 1,
  },
});