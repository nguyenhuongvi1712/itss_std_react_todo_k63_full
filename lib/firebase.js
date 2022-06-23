import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-B2OSxOWoCJTaPZ0-s8Y5HsWTKBp9J5o",
  authDomain: "fir-sample-c473f.firebaseapp.com",
  projectId: "fir-sample-c473f",
  storageBucket: "fir-sample-c473f.appspot.com",
  messagingSenderId: "698817229901",
  appId: "1:698817229901:web:3207797834a704bcc09804",
  measurementId: "G-VXDPSG56C8"
};

firebase.initializeApp(firebaseConfig);