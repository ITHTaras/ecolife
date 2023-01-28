import firebase from "firebase/compat/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDxbfD6sdmvdQV63AQXPLu2cJix159pHdo",
  authDomain: "ecolife-b18bd.firebaseapp.com",
  projectId: "ecolife-b18bd",
  storageBucket: "ecolife-b18bd.appspot.com",
  messagingSenderId: "511225817563",
  appId: "1:511225817563:web:ef14cf304c5f102b97dffe",
  measurementId: "G-4WYF4THYJK",
};

const app = firebase.initializeApp(firebaseConfig);

export const storage = getStorage(app);
