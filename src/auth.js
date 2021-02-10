import firebase from "firebase/app";
import store from "./store";

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("logged in as " + user.uid);
    store.commit("user/setUser", user);
    store.dispatch("storeInit", user.uid);
  } else {
    console.log("logged out");
    store.commit("user/setUserOut");
    store.dispatch("clearStore");
  }
});
