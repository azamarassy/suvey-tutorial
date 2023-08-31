// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtZfz6UmwtdRNt6kVrjJZtUagYVgjTXBk",
  authDomain: "web-survey-test.firebaseapp.com",
  projectId: "web-survey-test",
  storageBucket: "web-survey-test.appspot.com",
  messagingSenderId: "761453975223",
  appId: "1:761453975223:web:72841cbc97919a2df39f32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { app, firestore };