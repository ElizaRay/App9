import app from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKZRYvgTYBMAX0pWrNdGn_HJ1aoPVygWE",
  authDomain: "crudreact-fc384.firebaseapp.com",
  projectId: "crudreact-fc384",
  storageBucket: "crudreact-fc384.appspot.com",
  messagingSenderId: "915334697634",
  appId: "1:915334697634:web:760c4009aa4bb84565fdfb"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

//Creamos dos constante que exportamos como un objeto
const db = app.firestore()
const auth = app.auth()

export {db, auth}