import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/css/main.css";
import "boxicons";
// import newTask from './components/NewTask.vue'
import newProject from "./components/NewProject.vue";
import projectsViewer from "./components/ProjectsViewer.vue";

const app = createApp(App);

// app.component('new-task',newTask);
app.component("new-project", newProject);
app.component("projects-viewer", projectsViewer);

app.mount("#app");
