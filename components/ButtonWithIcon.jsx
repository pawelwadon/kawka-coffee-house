import { Pressable, Text} from "react-native";
import { globalStyles } from "../styles/styles";
import Icon from "./Icon";

export default function ButtonWithIcon({ onPress, style, buttonText, color, path, variant = 'full', width = 18, height = 18}) {
    const textStyle = variant === 'empty' 
        ? [globalStyles.buttonText, { color: "#31572c" }] 
        : globalStyles.buttonText;

    return (
        <Pressable onPress={onPress} style={style}>
            <Icon width={width} height={height} color={color} path={path} viewBox="0 0 512 512"/>
            <Text style={textStyle}> {buttonText} </Text>
        </Pressable>
    );
}