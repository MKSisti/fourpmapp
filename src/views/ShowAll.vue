<template>
  <div class="shadow-xl bg-darkC rounded-md py-8 px-12 lg:w-3/4 mx-auto">
    <h1 class="text-center text-fordark text-3xl font-bold mb-12 uppercase">
      Projects List
    </h1>

    <div
      class="text-center uppercase text-xl font-medium text-fordark"
      v-if="err"
    >
      <box-icon
        name="error"
        size="cssSize"
        class="h-6 w-6 stroke-current stroke-1 fill-current text-fieryRose animate-bounce"
      ></box-icon>
      <span> ERROR while Loading Projects!! </span>

      <box-icon
        name="error"
        size="cssSize"
        class="h-6 w-6 stroke-current stroke-1 fill-current text-fieryRose animate-bounce"
      ></box-icon>
    </div>
    <div
      class="text-center uppercase text-xl font-medium text-fordark"
      v-else-if="loading"
    >
      <span class="text-xl">Loading Projects</span>
      <box-icon
        size="cssSize"
        name="loader-alt"
        class="h-5 w-5 stroke-current stroke-1 ml-4 fill-current text-lightC animate-spin"
      ></box-icon>
    </div>
    <div v-else-if="projects.length > 0">
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
    </div>

    <div class="text-center uppercase text-xl font-medium text-fordark" v-else>
      No items to show
    </div>
  </div>
</template>

<script>
import ProjectsViewer from "../components/ProjectsViewer.vue";
import axios from "axios";

export default {
  components: { ProjectsViewer },
  data() {
    return {
      projects: [],
      loading: false,
      err: false,
    };
  },
  methods: {
    async patchP(id, changes) {
      try {
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
      } catch (error) {
        console.error(error.message);
      }
    },
    async getAll() {
      try {
        this.err = false;
        this.loading = true;
        const all = await axios(
          "https://vue-test-6edc5.firebaseio.com/projects.json",
          { timeout: 3000 }
        );
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
        this.loading = false;
      } catch (error) {
        console.error(error.message);
        this.err = true;
        this.loading = false;
      }
    },
    async deleteProject(id) {
      await this.deleteP(id);
      await this.getAll();
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
  created() {
    this.getAll();
  },
};
</script>