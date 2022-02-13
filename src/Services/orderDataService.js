import firebaseApp from "../Utils/firebase";
import { getDatabase, ref, set, get, onValue } from "firebase/database";
import CryptoJS from "crypto-js";
import toast from 'react-hot-toast';

const db = getDatabase(firebaseApp);

//==================== SEND ORDER ====================//
export const sendOrder = (order,time,navCB) => {
  let key = CryptoJS.AES.encrypt(
    new Date().valueOf().toString(),
    "BarkginBurger"
  )
    .toString()
    .split("/")
    .join("-");

  order.key = key;
  order.status = 'unconfirmed';

  let newOrderRef = ref(db, `Orders/${key}`);
  let timesRef = ref(db, `Time/${time.key}`);

  get(timesRef).then((snapshot) => {
    let newValue = parseInt(snapshot.val()['amount']) + order.products.length;
    let newTime = time
    newTime.amount = newValue
    set(timesRef,newTime) 
  });

  set(newOrderRef,order).then(()=>{
    toast.success("Se envió su pedido!", { position: "bottom-center" });
  });

  navCB(key)
};
//==================== GET ORDER ====================//
export const getOrder = (key,cb) => {
  let orderRef = ref(db, `Orders/${key}`);
  onValue(orderRef, (snapshot) => {
    let data = snapshot.val();
    if(data !== null) {
      cb(snapshot.val());
    }
    else cb({status:'delivered'})
  });
};
//==================== GET TIMES ====================//
export const getTimes = (cb) => {
  let times = ref(db,'Time/')
  onValue(times,(snapshot)=>{
    cb(snapshot.val())
  })
};
//==================== GET ORDERS ====================//
export const getOrders = (cb) => {
  let orders = ref(db,'Orders/')
  onValue(orders,(snapshot)=>{
    let data = snapshot.val()
    if(data !== null){
      let keys = Object.keys(snapshot.val());
      let arr = []
      keys.forEach(key => {
        arr.push(data[key]) 
      })

      cb(arr)
    }
  })
};
//==================== UPDATE STATUS ====================//
export const updateStatus = (order,forceUpdate) => {
  let orderRef = ref(db, `Orders/${order.key}`);
  let newOrder = order;

  if (order.status === "ready") {
    set(orderRef,null);
    forceUpdate()
  } else {
    switch (newOrder.status) {
      case "unconfirmed":
        newOrder.status = "confirmed";
        break;
      case "confirmed":
        newOrder.status = "ready";
        break;
      default:
        break;
    }
    set(orderRef,newOrder).then(()=>{
    toast.success("Se actualizó el estado!", { position: "bottom-center" });
  });
  }
};
//==================== CHECK TIME ====================//
export const checkTime = (time) => {
  var status = true;

  if(time.amount >= 10) { status = false };
  if(!time.active) { status = false };

  let today = new Date()
  let currentTime = new Date();
  let splittedTime = time.time.split(':');
  let givenTime = new Date();
  
  if( parseInt(splittedTime[0]) < 21 ) {
    givenTime.setHours(splittedTime[0] + 24,splittedTime[1],0)
  }
  else givenTime.setHours(splittedTime[0],splittedTime[1],0)

  currentTime.setHours(today.getHours(),today.getMinutes(),0);

  if (currentTime >= givenTime) { status = false }

  return status
};
