<template>
  <section class="w-full space-y-4 py-6 mx-auto lg:w-3/4 select-none">
    <div
      class="transition duration-300 shadow fixed bg-blue-300 px-6 py-2 -ml-12 rounded opacity-75"
    >
      {{ appState }}
    </div>
    <div class="transition-all shadow-xl bg-darkC rounded-md py-8 px-12">
      <h1
        class="mb-6 transition duration-150 ease-in-out shadow-lg mx-auto bg-baseC text-center text-2xl uppercase cursor-pointer font-black p-5 max-w-md text-lightM rounded-xl hover:bg-baseHover"
        @click="ShowAddProject"
      >
        Add new Projects
      </h1>
      <transition appear name="fade-in">
        <new-project
          class="transition-all duration-500 ease"
          v-show="formVisible"
          @add-project="addProject"
          @project-changed="updateDB"
        ></new-project>
      </transition>
    </div>

    <div class="shadow-xl bg-darkC rounded-md py-8 px-12">
      <h1 class="text-center text-fordark text-3xl font-bold mb-12 uppercase">
        Projects List
      </h1>
      <div v-if="projects.length > 0">
        <projects-viewer
          v-for="project in projects"
          @delete-project="deleteProject"
          @delete-ptask="deleteTask"
          @finished-ptask="finishedTask"
          @project-changed="updateDB"
          :key="project.pname"
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
import localforage from "localforage";

// import "./assets/css/main.css"

// import NewTask from "./components/NewTask.vue";

export default {
  components: { NewProject, ProjectsViewer },
  name: "App",
  async created() {
    await this.getProjects();
  },
  computed: {
    appState() {
      return this.updateTimeout ? "working ..." : "saved";
    },
  },
  data() {
    return {
      projects: [],
      formVisible: false,
      updateTimeout: null,
      updateCounter: 0,
    };
  },
  methods: {
    cancelPreUpdate() {
      if (this.updateTimeout) {
        clearTimeout(this.updateTimeout);
      }
      this.updateTimeout = null;
    },
    async updateDB() {
      this.updateCounter++;
      this.cancelPreUpdate();

      this.updateTimeout = setTimeout(
        async () => {
          await this.createProjects();
          // console.log(that.projects);
          this.updateTimeout = null;
          this.updateCounter = 0;
        },
        this.updateCounter > 5 ? 0 : 3000
      );
    },
    async createProjects() {
      let tmpProj = JSON.stringify({
        projects: Array.from(this.projects),
      });

      try {
        await localforage.setItem("Projects", tmpProj);
      } catch (err) {
        console.error(err);
      }
    },
    async getProjects() {
      try {
        this.projects = JSON.parse(
          await localforage.getItem("Projects")
        ).projects;
        console.log(this.projects);
      } catch (error) {
        console.warn("empty database");
      }
    },
    ShowAddProject() {
      this.formVisible = !this.formVisible;
    },
    addProject(P) {
      this.projects.push(P);
      this.createProjects();
    },
    deleteProject(name) {
      this.projects = this.projects.filter((project) => project.name !== name);
      this.createProjects();
    },
    deleteTask(taskName, projectName) {
      // this.projects = this.projects.filter((task) => task.name !== name);
      var newArr = [];
      for (let i = 0; i < this.projects.length; i++) {
        if (this.projects[i].name != projectName) {
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
    finishedTask(taskName, projectName) {
      // this.projects = this.projects.filter((task) => task.name !== name);

      for (let i = 0; i < this.projects.length; i++) {
        if (this.projects[i].name == projectName) {
          for (let j = 0; j < this.projects[i].tasks.length; j++) {
            if (this.projects[i].tasks[j].name == taskName) {
              this.projects[i].tasks[j].finished = !this.projects[i].tasks[j]
                .finished;
            }
          }
          var newW = this.calcW2(this.projects[i].tasks);
          // console.log(newW);
          this.projects[i].completion = newW;
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
        total += Number(T[idx].duration)  ;
        if (T[idx].finished == true) {
          ftot += Number( T[idx].duration ) ;
        }
      }
      // console.log(total);
      // console.log(ftot);
      var w = (ftot / total) * 100;
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

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
