import firebaseConfig from '../config/firebaseConfig';
import { initializeApp } from 'firebase/app';

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
