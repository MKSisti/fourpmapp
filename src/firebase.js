import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// firebase init
const firebaseConfig = {
  apiKey: "AIzaSyAKN7ZF6rAz-DSd1OuL7CDYeIXfQQ62w0o",
  authDomain: "onepm-78e50.firebaseapp.com",
  projectId: "onepm-78e50",
  storageBucket: "onepm-78e50.appspot.com",
  messagingSenderId: "137218905046",
  appId: "1:137218905046:web:fcc11be0e65f8ff49aca77"
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.database();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const prEmailPass = new firebase.auth.EmailAuthProvider();
// const Gprovider = firebase.auth.GoogleAuthProvider();

// collection references
const projects = firebase.database().ref("projects");
const users = firebase.database().ref("users");

// export utils/refs
export { db, auth, projects, users, provider, prEmailPass };
