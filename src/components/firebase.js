import firebase from "firebase/app"
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBsoCXVGjxfXAxLzYWqKSES1S_UtjqaVEU",
    authDomain: "les-tutos-de-fredpack.firebaseapp.com",
    projectId: "les-tutos-de-fredpack",
    storageBucket: "les-tutos-de-fredpack.appspot.com",
    messagingSenderId: "388398365512",
    appId: "1:388398365512:web:9cf1c494dc1b432c0b117d",
    measurementId: "G-KL7QYSRX50"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

export default firebase