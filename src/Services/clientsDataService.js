import firebaseApp from '../Utils/firebase'
import {getDatabase, ref, onValue, set} from 'firebase/database';

const db = getDatabase(firebaseApp);

//==================== GET CLIENT INFO ====================//
export const getClientInfo = (phone, cb) => {
  let clientRef = ref(db, `Clients/${phone}`);
  onValue(clientRef, (snapshot) => {
    let data = snapshot.val();
    if(data !== null) {
      cb(snapshot.val());
    }
    else console.log('Client not found!')
  });
};
//==================== SAVE CLIENT INFO ====================//
export const newClient = (clientInfo) => {
  let newClientRef = ref(db, `Clients/${clientInfo.phone}`);
  set(newClientRef, { name: clientInfo.name, phone: clientInfo.phone });
};
