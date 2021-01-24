import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import "@/assets/css/main.css";
import "boxicons";

import AddOne from "./views/CreateP.vue";
import ShowAll from "./views/ShowAll.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/add",
      component: AddOne,
    },
    {
      path: "/",
      component: ShowAll,
    },
    
    
  ],
});

const app = createApp(App);
app.use(router);
app.mount("#app");
