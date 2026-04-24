import { FIREBASE_DB } from "./FirebaseConfig";
import { doc, getDoc, increment, arrayUnion, updateDoc } from "firebase/firestore";
import { addVisitsHistory } from './addVisitsHistory';

export const addStamps = async (userUID, setCount, count, userName) => {

    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const dateOfVisit = `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}r.`;

    try{
    const response = await getDoc(doc(FIREBASE_DB, 'users', userUID));
    console.log(response.data());
    
    await updateDoc(doc(FIREBASE_DB, 'users', userUID), {
      stamps: increment(count),
      allTimeStamps: increment(count),
      visits: arrayUnion({ collectedStamps : count, dateOfVisit : dateOfVisit, type: 'stamp'})
    });

    await addVisitsHistory({ clientName: userName, activity: `Dodano ${count} pieczątek`, type: 'stamp', count:count });

    console.log(`Dodano ${count} pieczątek klientowi`);
    setCount(1);
  }catch(error){
    console.log(error)
  };
}