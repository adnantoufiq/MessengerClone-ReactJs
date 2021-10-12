import { firebase } from '@firebase/app';
import '@firebase/firestore'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAuPQVvIO1MSmyTxrq8osLd2AUo3Xgj0S0",
  authDomain: "chat-apps-40b3a.firebaseapp.com",
  projectId: "chat-apps-40b3a",
  storageBucket: "chat-apps-40b3a.appspot.com",
  messagingSenderId: "85115457544",
  appId: "1:85115457544:web:c8206535412ec38fb081bd",
  measurementId: "G-G51CSS1373"


})

const db =firebaseApp.firestore();
export default db;