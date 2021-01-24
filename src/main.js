import { createApp } from "vue";
// import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import "@/assets/css/main.css";
import "boxicons";

// import newPrj from "./components/NewProject.vue";
// import prjViewer from "./components/ProjectsViewer.vue";

// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     {
//       path: "/add",
//       component: newPrj,
//     },
//     {
//       path: "",
//       component: prjViewer,
//     },
//   ],
// });

const app = createApp(App);
// app.use(router);
app.mount("#app");
