// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtx6aDbYir1WpAjkQGxI2KQT7p_W0R0io",
  authDomain: "ev-mobile-app-39b6b.firebaseapp.com",
  databaseURL: "https://ev-mobile-app-39b6b-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "ev-mobile-app-39b6b",
  storageBucket: "ev-mobile-app-39b6b.appspot.com",
  messagingSenderId: "414427227808",
  appId: "1:414427227808:web:ce9ff6dd516824069a4bc5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})
export { auth }

// Add database key for todolist
export const CARS_REF = '/cars/'
export const USERS_REF = '/users/'
export const PRICES_REF = '/prices/'