import { createRouter, createWebHistory } from "vue-router";
import AddOne from "../views/CreateP.vue";
import ShowAll from "../views/ShowAll.vue";
import ShowOne from "../views/ShowOne.vue";

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

export default router;
