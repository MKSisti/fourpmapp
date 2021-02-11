import { createApp } from "vue";
// import { auth } from "./firebase";

import App from "./App.vue";
import store from "./store/index.js";
import router from "./router/index.js";

import "@/assets/css/main.css";

import BaseCard from "./components/BaseComponents/BaseCard.vue";
import BaseButton from "./components/BaseComponents/BaseButton.vue";
import BaseIcon from "./components/BaseComponents/BaseIcon.vue";

const app = createApp(App);
app.component("BaseCard", BaseCard);
app.component("BaseButton", BaseButton);
app.component("BaseIcon", BaseIcon);

app.use(router);
app.use(store);
app.mount("#app");

import "./auth";

// auth.onAuthStateChanged(function(user) {
//   if (user) {
//     console.log("logged in as " + user.uid);
//     store.commit("user/setUser", user);
//     store.dispatch("storeInit", user.uid);
//   } else {
//     console.log("logged out");
//     store.commit("user/setUserOut");
//     store.dispatch("clearStore");
//   }
// });
