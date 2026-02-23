import { StyleSheet } from 'react-native';

const mainColor = '#EADCC1';
const whiteColor = '#fffcf2';
const greenColor = '#31572c';
const darkColor = '#313634';  
const redColor = '#E01F4A';


export const globalStyles =  StyleSheet.create({
  screen: {
    flex: 1,
  },
  header:{
    paddingHorizontal: 24,
    paddingVertical: 8,
    flex: 1,
  },
  contentHolder: {
    bottom: 0,
    height: '80%',
  }, 
  h1: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 40,
    letterSpacing: -1,
    color: greenColor,
  },
  h2: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    letterSpacing: -1,
    color: darkColor,
  },
  h3: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: darkColor,
  },
  h4: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    lineHeight: 20,
    color: greenColor,
  },
  h5: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: darkColor,
  },
  bodyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: darkColor,
  },
  fullButton: {
    width:'100%',
    backgroundColor: greenColor,
    paddingVertical: 6,
    display:'flex',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: greenColor,
  },
  emptyButton: {
    width: '100%',
    paddingVertical: 6,
    display:'flex',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: greenColor,
  },
  buttonFlex: {
    flex:1,
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: whiteColor,
  },
  boxShadow: {
    shadowColor: "#313634",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    zIndex:10,
  },
});