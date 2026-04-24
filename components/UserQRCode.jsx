import QRCodeStyled from 'react-native-qrcode-styled';
import { globalStyles } from "../styles/styles";

export default function UserQRCode( props ) {

    return (
     <QRCodeStyled data={props.userUID} style={[globalStyles.boxShadow, {backgroundColor:'#fffcf2', borderRadius:12}]} size={props.size} pieceSize={4} pieceCornerType={'rounded'} pieceBorderRadius={4} isPiecesGlued={true} padding={12}/>        
    );
}