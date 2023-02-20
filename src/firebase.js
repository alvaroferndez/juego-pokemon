 // Import the functions you need from the SDKs you need
 import { initializeApp } from "firebase/app";
 import { getFirestore } from "firebase/firestore";
 import { getAuth } from "firebase/auth";
 
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 // Your web app's Firebase configuration
 const firebaseConfig = {
     apiKey: "AIzaSyCWfnnOzozSD2OkBUvWNEYJxkKwE3yoDSg",
     authDomain: "pokemon-8899e.firebaseapp.com",
     projectId: "pokemon-8899e",
     storageBucket: "pokemon-8899e.appspot.com",
     messagingSenderId: "742229150158",
     appId: "1:742229150158:web:34623bf6b6673c7b4bc39f"
 };
 // Initialize Firebase
 
 const app = initializeApp(firebaseConfig);
 // Export firestore database
 // It will be imported into your react app whenever it is needed
 export const db = getFirestore(app);
 export const auth = getAuth(app);