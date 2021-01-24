<template>
  <section class="w-full space-y-8">
    <nav-bar></nav-bar>
    <router-view></router-view>
  </section>
</template>

<script>
// import NewProject from "./components/NewProject.vue";
// import ProjectsViewer from "./components/ProjectsViewer.vue";

import NavBar from "./components/NavBar.vue";

// import localforage from "localforage";
import axios from "axios";

// import "./assets/css/main.css"

// import NewTask from "./components/NewTask.vue";

export default {
  components: { NavBar },
  name: "App",
  // async created() {
  //   // await this.getProjects();
  //   await this.getAll();
  //   console.log(this.projects.length + " created App");
  // },
  // mounted() {
  //   console.log(this.projects.length + " mounted App");
  // },
  provide() {
    return {
      addProject: this.addProject,
      projects: this.projects,
      deleteProject: this.deleteProject,
      deleteTask2: this.deleteTask2,
      finishedTask: this.finishedTask,
      getAll: this.getAll,
    };
  },
  computed: {
    appState() {
      return this.updateTimeout ? "working ..." : "saved";
    },
  },
  data() {
    return {
      projects: [],
    };
  },
  methods: {
    async creatP(P) {
      try {
        await axios.post(
          "https://vue-test-6edc5.firebaseio.com/projects.json",
          P,
          { timeout: 3000 }
        );
      } catch (error) {
        console.error(error.message);
      }
    },
    async patchP(id, changes) {
      try {
        console.log(id);
        console.log(changes);
        await axios.patch(
          "https://vue-test-6edc5.firebaseio.com/projects/" + id + ".json",
          changes,
          { timeout: 3000 }
        );
      } catch (error) {
        console.error(error.message);
      }
    },
    async deleteP(id) {
      try {
        await axios.delete(
          "https://vue-test-6edc5.firebaseio.com/projects/" + id + ".json",
          { timeout: 3000 }
        );
        // console.log(id);
      } catch (error) {
        console.error(error.message);
      }
    },
    async getAll() {
      try {
        const all = await axios(
          "https://vue-test-6edc5.firebaseio.com/projects.json",
          { timeout: 3000 }
        );
        // console.log(all.data);
        let tmp = [];
        for (const id in all.data) {
          tmp.push({
            id: id,
            name: all.data[id].name,
            desc: all.data[id].desc,
            completion: all.data[id].completion,
            tasks: all.data[id].tasks,
          });
        }
        this.projects = tmp;
      } catch (error) {
        console.error(error.message);
      }
    },
    async addProject(P) {
      await this.creatP(P);
      
    },
    async deleteProject(id) {
      await this.deleteP(id);
      await this.getAll();
    },

    deleteTask(taskName, projectId) {
      var newArr = [];
      for (let i = 0; i < this.projects.length; i++) {
        if (this.projects[i].id != projectId) {
          newArr.push(this.projects[i]);
        } else {
          this.projects[i].tasks = this.projects[i].tasks.filter(
            (task) => task.name !== taskName
          );
          newArr.push(this.projects[i]);
          var newW = this.calcW2(this.projects[i].tasks);

          this.projects[i].completion = newW;
        }
      }
      this.projects = newArr;
    },
    async deleteTask2(taskName, projectId) {
      var changes = {};
      for (let i = 0; i < this.projects.length; i++) {
        if (this.projects[i].id == projectId) {
          let tmpt = this.projects[i].tasks.filter(
            (task) => task.name !== taskName
          );
          changes = {
            tasks: tmpt,
            completion: this.calcW2(tmpt),
          };
        }
      }

      await this.patchP(projectId, changes);
      await this.getAll();
    },
    async finishedTask(taskName, projectId) {
      for (let i = 0; i < this.projects.length; i++) {
        if (this.projects[i].id == projectId) {
          for (let j = 0; j < this.projects[i].tasks.length; j++) {
            if (this.projects[i].tasks[j].name == taskName) {
              this.projects[i].tasks[j].finished = !this.projects[i].tasks[j]
                .finished;
            }
          }
          var newW = this.calcW2(this.projects[i].tasks);

          this.projects[i].completion = newW;

          await this.patchP(projectId, {
            tasks: this.projects[i].tasks,
            completion: newW,
          });
        }
      }
    },
    calcW(T) {
      var i = 0;
      for (let idx = 0; idx < T.length; idx++) {
        if (T[idx].finished == true) {
          i++;
        }
      }
      var w = (i / T.length) * 100;
      var W = " width: " + w + "%";

      return W;
    },
    calcW2(T) {
      var total = 0;
      var ftot = 0;
      for (let idx = 0; idx < T.length; idx++) {
        total += Number(T[idx].duration);
        if (T[idx].finished == true) {
          ftot += Number(T[idx].duration);
        }
      }

      var w = ((ftot / total) * 100).toFixed(2);
      return " width: " + w + "%";
    },
  },
};
</script>

<style>
@import url("./assets/css/main.css");

.fade-in-enter-from {
  max-height: 0px;
  opacity: 0;
}

.fade-in-leave-to {
  max-height: 0px;
  opacity: 0;
}

.fade-in-enter-to {
  max-height: 999px;
  opacity: 1;
}

.fade-in-leave-from {
  max-height: 999px;
  opacity: 1;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-from {
  opacity: 1;
}
</style>
