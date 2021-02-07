<template>
  <base-card>
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
        @delete-ptask="deleteTask"
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
  </base-card>
</template>

<script>
import ProjectsViewer from "../components/ProjectsViewer.vue";
import { mapGetters } from "vuex";
// import axios from "axios";

export default {
  components: { ProjectsViewer },
  computed: {
    ...mapGetters({
      projects: "getProjects",
      loading: "getLoading",
      err: "getLoadingErr",
    }),
  },
  methods: {
    async deleteProject(id) {
      // console.log(id);
      await this.$store.dispatch("newDeleteP", id);
      await this.$store.dispatch("getAll");
    },
    async deleteTask(taskName, projectId) {
      await this.$store.dispatch("deleteTask", {
        projectId,
        taskName,
      });
    },
    async finishedTask(taskName, projectId) {
      await this.$store.dispatch("finishedTask", {
        taskName,
        projectId,
      });
    },
  },
};
</script>