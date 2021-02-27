import { auth } from "./firebase";
import store from "./store";
import router from "./router";

auth.onAuthStateChanged(async function(user) {
  if (user) {
    // console.log("logged in as " + user.uid);
    // store.commit("user/setUser", user);
    await store.dispatch("user/setupUser", user);
    router.push({ name: "home" });
  } else {
    // console.log("logged out");
    store.commit("user/setUserOut");
    store.dispatch("clearStore");
    router.push({ name: "welcome" });
  }
});
