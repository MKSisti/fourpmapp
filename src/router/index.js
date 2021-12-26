import { createRouter, createWebHistory } from "vue-router";
import AddOne from "../views/CreateP.vue";
import ShowAll from "../views/ShowAll.vue";
import ShowOne from "../views/ShowOne.vue";
import Welcome from "../views/Welcome.vue";
import SignUp from "../views/SignUp";
import SignIn from "../views/SignIn";
import ResetPwd from "../views/ResetPwd";
import HandleReset from "../views/HandleReset";
// import store from "../store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: ShowAll,
    },
    {
      path: "/signUp",
      name: "signUp",
      component: SignUp,
    },
    {
      path: "/signIn",
      name: "signIn",
      component: SignIn,
    },
    {
      path: "/resetPwd",
      name: "resetPwd",
      component: ResetPwd,
    },
    {
      path: "/handleReset",
      name: "handleReset",
      component: HandleReset,
    },
    {
      path: "/welcome",
      name: "welcome",
      component: Welcome,
    },
    {
      path: "/add",
      name: "create",
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

// router.beforeEach((to, from, next) => {
//   if (to.name != "welcome" && !store.getters["user/getloggedState"])
//     next({ name: "welcome" });
//   else next();
// });

export default router;
