import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCxfhgHqUaE-woMvpLzmwm5j-Aw4J-URE",
  authDomain: "nimble-dev-ce71c.firebaseapp.com",
  projectId: "nimble-dev-ce71c",
  storageBucket: "nimble-dev-ce71c.appspot.com",
  messagingSenderId: "504997378614",
  appId: "1:504997378614:web:7b15021602522873e17697",
  measurementId: "G-TSZKTXP1TV",
};

if (!getApps?.length) {
  initializeApp(firebaseConfig);
}

export const db = getFirestore();
export const auth = getAuth();
