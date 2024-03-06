// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5LTN5HMqyGGe2sbbErItxEbO3MVxmoXo",
  authDomain: "connectify-57b87.firebaseapp.com",
  projectId: "connectify-57b87",
  storageBucket: "connectify-57b87.appspot.com",
  messagingSenderId: "772258437482",
  appId: "1:772258437482:web:9d1138c158898219efad13",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
