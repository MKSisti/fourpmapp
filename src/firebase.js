import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// firebase init
const firebaseConfig = {
  apiKey: "AIzaSyDHEWiHODU8VOVdGoqS3ut6BC5BjBUQh3I",
  authDomain: "vue-test-6edc5.firebaseapp.com",
  databaseURL: "https://vue-test-6edc5.firebaseio.com",
  projectId: "vue-test-6edc5",
  storageBucket: "vue-test-6edc5.appspot.com",
  messagingSenderId: "580449538579",
  appId: "1:580449538579:web:79e9cadb8072c79a72a5e6",
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.database();
const auth = firebase.auth();

// collection references
const projects = firebase.database().ref('projects');

// export utils/refs
export { db, auth, projects };
