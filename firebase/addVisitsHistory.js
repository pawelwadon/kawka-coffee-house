import { FIREBASE_DB } from "./FirebaseConfig";
import { collection, addDoc, count } from "firebase/firestore";

export const addVisitsHistory = async ({clientName, activity, type, count}) => {
  const currentDate = new Date();
    
  try{    
    await addDoc(collection(FIREBASE_DB, 'history'), {
      client : clientName, 
      dateOfVisit : currentDate,
      activity: activity,
      type: type,
      count: count
    });
  }catch(error){
    console.log(error)
  };
};