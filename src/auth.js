import { auth } from "./firebase";
import store from "./store";
import router from "./router";

auth.onAuthStateChanged(function(user) {
  if (user) {
    // console.log("logged in as " + user.uid);
    store.commit("user/setUser", user);
    store.dispatch("storeInit", user.uid);
    router.push({name:'home'})
  } else {
    // console.log("logged out");
    store.commit("user/setUserOut");
    store.dispatch("clearStore");
  }
});
