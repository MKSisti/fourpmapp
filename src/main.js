import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import "@/assets/css/main.css";
import "boxicons";

import AddOne from "./views/CreateP.vue";
import ShowAll from "./views/ShowAll.vue";
import ShowOne from "./views/ShowOne.vue";
import BaseCard from "./components/BaseComponents/BaseCard.vue";
import BaseButton from "./components/BaseComponents/BaseButton.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: ShowAll,
    },
    {
      path: "/add",
      component: AddOne,
    },
    {
      path: "/projects/:ProjectId",
      name: "project",
      component: ShowOne,
      props: true,
    },
  ],
});

const app = createApp(App);
app.component("BaseCard", BaseCard);
app.component("BaseButton", BaseButton);

app.use(router);
app.mount("#app");
