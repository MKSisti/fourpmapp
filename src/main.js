import { createApp } from "vue";

import App from "./App.vue";
import store from "./store/index.js";
import router from "./router/index.js";
import { db } from "./firebase.js";
import "@/assets/css/main.css";
import "boxicons";

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

//todo: move this init
db.ref("/projects").on("value", function(ds) {
  store.state.loading = true;
  store.state.projects = [];

  ds.forEach(function(p) {
    store.state.projects.push({
      id: p.key,
      name: p.val().name,
      desc: p.val().desc,
      completion: p.val().completion,
      tasks: p.val().tasks,
    });
  });
  store.state.loading = false;
});
