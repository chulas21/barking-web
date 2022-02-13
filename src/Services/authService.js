import firebaseApp from '../Utils/firebase'
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {getDatabase, ref, onValue} from 'firebase/database';
import toast from 'react-hot-toast';

const db = getDatabase(firebaseApp);
const provider = new GoogleAuthProvider();
const auth = getAuth();

//==================== GOOGLE AUTH ====================//
export const googleAuth = (navCB) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user)
      setUID(user.uid,navCB)
    })
    .catch((error) => {
      console.log(error);
    });
};
//==================== GET USER DATA ====================//
export const getUserData = (uid) => {
  let userRef = ref(db, `Users/${uid}`);
  onValue(userRef, (snapshot) => {
    let data = snapshot.val();
    if(data !== null) {
      console.log(data)
    }
    else console.log('User not found!')
  });
};
//==================== SET SESSION ====================//
const setUID = (uid,navCB) => {
  let userRef = ref(db, `Users/${uid}`);
  onValue(userRef, (snapshot) => {
    let data = snapshot.val();
    if (data !== null) {
      sessionStorage.setItem("UID", uid);
      navCB()
    } else toast.error("Usuario no autorizado!", { position: "bottom-center" });
  });
};
//==================== GET AUTH STATUS ====================//
export const getAuthStatus = () => {
  if( sessionStorage.getItem('UID') !== null) {
    return true
  }
  else return false
};
