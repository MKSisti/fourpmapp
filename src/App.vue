<template>
  <section class="w-full space-y-8 select-none">
    <nav-bar></nav-bar>
    <transition name="slide" mode="in-out">
      <router-view class="transition-all duration-500 ease"></router-view>
    </transition>
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

  provide() {
    return {
      addProject: this.addProject,
    };
  },
  data() {
    return {};
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

    async addProject(P) {
      await this.creatP(P);
      this.$router.push("/");
    },

    // deleteTask(taskName, projectId) {
    //   var newArr = [];
    //   for (let i = 0; i < this.projects.length; i++) {
    //     if (this.projects[i].id != projectId) {
    //       newArr.push(this.projects[i]);
    //     } else {
    //       this.projects[i].tasks = this.projects[i].tasks.filter(
    //         (task) => task.name !== taskName
    //       );
    //       newArr.push(this.projects[i]);
    //       var newW = this.calcW2(this.projects[i].tasks);

    //       this.projects[i].completion = newW;
    //     }
    //   }
    //   this.projects = newArr;
    // },

    // calcW(T) {
    //   var i = 0;
    //   for (let idx = 0; idx < T.length; idx++) {
    //     if (T[idx].finished == true) {
    //       i++;
    //     }
    //   }
    //   var w = (i / T.length) * 100;
    //   var W = " width: " + w + "%";

    //   return W;
    // },
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

.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
