import firebaseApp from '../Utils/firebase'
import {getDatabase, ref, set, onValue} from 'firebase/database';
import CryptoJS from 'crypto-js';

const db = getDatabase(firebaseApp);

//==================== NEW PRODUCT ====================//
export const newProduct = (prod) => {
  let key = CryptoJS.AES.encrypt(
    new Date().valueOf().toString(),
    "BarkginBurger"
  )
    .toString()
    .split("/")
    .join("-");
  let productRef = ref(db, `Products/${key}`);
  prod.key = key;
  set(productRef,prod);
};
//==================== GET PRODUCTS ====================//
export const getProducts = (cb) => {
  let productsRef = ref(db, "Products/");
  onValue(productsRef, (snap) => {
    if (snap.val() !== null) {
      let keys = Object.keys(snap.val());
      let arr = [];
      keys.forEach((key) => {
        arr.push(snap.val()[key]);
      });
      cb(arr);
    }
    else cb([])
  });
};;
