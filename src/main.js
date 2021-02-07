import { createApp } from "vue";

import App from "./App.vue";
import store from "./store/index.js";
import router from "./router/index.js";
import { db } from "./firebase.js";
import "@/assets/css/main.css";
import "boxicons";

// import AddOne from "./views/CreateP.vue";
// import ShowAll from "./views/ShowAll.vue";
// import ShowOne from "./views/ShowOne.vue";
import BaseCard from "./components/BaseComponents/BaseCard.vue";
import BaseButton from "./components/BaseComponents/BaseButton.vue";

const app = createApp(App);
app.component("BaseCard", BaseCard);
app.component("BaseButton", BaseButton);

app.use(router);
app.use(store);
app.mount("#app");

//todo: move this init to actions
db.ref("/projects")
  .get()
  .then(function(ds) {
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
