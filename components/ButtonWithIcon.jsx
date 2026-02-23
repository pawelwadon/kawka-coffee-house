import { Pressable, Text} from "react-native";
import { globalStyles } from "../styles/styles";
import Icon from "./Icon";

export default function ButtonWithIcon({ onPress, style, buttonText, color, path, variant = 'full' }) {
    const textStyle = variant === 'empty' 
        ? [globalStyles.buttonText, { color: "#31572c" }] 
        : globalStyles.buttonText;

    return (
        <Pressable onPress={onPress} style={style}>
            <Icon width={12} height={12} color={color} path={path}/>
            <Text style={textStyle}> {buttonText} </Text>
        </Pressable>
    );
}