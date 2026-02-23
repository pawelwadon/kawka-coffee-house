import { Pressable, Text} from "react-native";
import { globalStyles } from "../styles/styles";

export default function Button({ onPress, style, buttonText, variant = 'full' }) {
    const textStyle = variant === 'empty' 
        ? [globalStyles.buttonText, { color: "#31572c" }] 
        : globalStyles.buttonText;

    return (
        <Pressable onPress={onPress} style={style}>
            <Text style={textStyle}> {buttonText} </Text>
        </Pressable>
    );
}