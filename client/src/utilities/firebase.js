import firebase from "firebase/compat/app";
// auth
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF3RVGTFPMz0vuaRhKnv2LB_Uk1c2w58c",
  authDomain: "evangadiautomation.firebaseapp.com",
  projectId: "evangadiautomation",
  storageBucket: "evangadiautomation.appspot.com",
  messagingSenderId: "934172286214",
  appId: "1:934172286214:web:92dba8fcd16a847f2c9287",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
