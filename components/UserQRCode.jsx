import QRCodeStyled from 'react-native-qrcode-styled';
import { globalStyles } from "../styles/styles";

export default function UserQRCode( ) {

//logika do generowania kodu QR z danymi uzytkownika
    return (
     <QRCodeStyled data={'https://www.instagram.com/kawka.oswiecim/'} style={[globalStyles.boxShadow, {backgroundColor:'#fffcf2', borderRadius:12}]} size={120} pieceSize={4} pieceCornerType={'rounded'} pieceBorderRadius={4} isPiecesGlued={true} padding={12}/>        
    );
}