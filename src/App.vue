<template>
  <section class="w-full space-y-8 ">
    <nav-bar></nav-bar>
    <div class="transition-all shadow-xl bg-darkC rounded-md py-8 px-12 lg:w-3/4 select-none mx-auto">
      <h1
        class="mb-6 w-1/4 mx-auto transition duration-150 ease shadow-lg bg-baseC text-center text-2xl uppercase cursor-pointer font-black py-5 text-lightM rounded-xl hover:bg-baseHover"
        @click="ShowAddProject"
      >
        {{ addNewDynamic }}
      </h1>

      <transition appear name="fade-in">
        <new-project
          class="transition-all duration-500 ease"
          v-show="formVisible"
          @add-project="addProject"
        ></new-project>
      </transition>
    </div>

    <div class="shadow-xl bg-darkC rounded-md py-8 px-12 lg:w-3/4 mx-auto">
      <h1 class="text-center text-fordark text-3xl font-bold mb-12 uppercase">
        Projects List
      </h1>
      <div v-if="projects.length > 0">
        <projects-viewer
          v-for="project in projects"
          @delete-project="deleteProject"
          @delete-ptask="deleteTask2"
          @finished-ptask="finishedTask"
          :key="project.id"
          :pid="project.id"
          :pname="project.name"
          :pdesc="project.desc"
          :ptasks="project.tasks"
          :pcustomW="project.completion"
        ></projects-viewer>
        <!-- <div @click="deleteProject(project.name)" class="">
            X
            <i class="bx bxs-user-x bx-xs hovers"></i>
          </div> -->
      </div>
      <div
        class="text-center uppercase text-xl font-medium text-fordark"
        v-else
      >
        No items to show
      </div>
    </div>
  </section>
</template>

<script>
import NewProject from "./components/NewProject.vue";
import ProjectsViewer from "./components/ProjectsViewer.vue";
import NavBar from "./components/NavBar.vue";
// import localforage from "localforage";
import axios from "axios";

// import "./assets/css/main.css"

// import NewTask from "./components/NewTask.vue";

export default {
  components: { NewProject, ProjectsViewer, NavBar },
  name: "App",
  async created() {
    // await this.getProjects();
    await this.getAll();
  },
  computed: {
    appState() {
      return this.updateTimeout ? "working ..." : "saved";
    },
    addNewDynamic() {
      return this.formVisible ? "HIDE FORM" : "ADD NEW PROJECT";
    },
    attemptStyle() {
      return this.formVisible ? "" : "";
    },
  },
  data() {
    return {
      projects: [],
      formVisible: false,
      
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
    ShowAddProject() {
      this.formVisible = !this.formVisible;
    },
    async addProject(P) {
      // this.projects.push(P);
      // this.createProjects();
      await this.creatP(P);
      await this.getAll();
    },
    async deleteProject(id) {
      // this.projects.push(P);
      // this.createProjects();
      await this.deleteP(id);
      await this.getAll();
    },

    // async deleteProject(name) {
    //   this.projects = this.projects.filter((project) => project.name !== name);
    //   // await this.deleteP(id);
    //   // this.createProjects();
    // },
    deleteTask(taskName, projectId) {
      // this.projects = this.projects.filter((task) => task.name !== name);
      var newArr = [];
      for (let i = 0; i < this.projects.length; i++) {
        if (this.projects[i].id != projectId) {
          newArr.push(this.projects[i]);
          // console.log(this.projects[i]);
        } else {
          // console.log("here");
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
      // this.projects = this.projects.filter((task) => task.name !== name);
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
      // console.log(projectId);
      // console.log(changes);
      await this.patchP(projectId, changes);
      await this.getAll();
    },
    async finishedTask(taskName, projectId) {
      // this.projects = this.projects.filter((task) => task.name !== name);

      for (let i = 0; i < this.projects.length; i++) {
        if (this.projects[i].id == projectId) {
          for (let j = 0; j < this.projects[i].tasks.length; j++) {
            if (this.projects[i].tasks[j].name == taskName) {
              this.projects[i].tasks[j].finished = !this.projects[i].tasks[j]
                .finished;
            }
          }
          var newW = this.calcW2(this.projects[i].tasks);
          // console.log(newW);
          this.projects[i].completion = newW;

          await this.patchP(projectId, {
            tasks: this.projects[i].tasks,
            completion: newW,
          });
        }
      }

      // console.log(this.projects);
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
      // console.log(W);
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
      // console.log(total);
      // console.log(ftot);
      var w = ((ftot / total) * 100).toFixed(2);
      return " width: " + w + "%";
    },
  },
};
</script>

<style>
@import url("./assets/css/main.css");

/* .fade-in-enter-active,
.fade-in-leave-active {
  transition:all 300ms ease;
}  */

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

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
