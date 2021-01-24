<template>
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
    </div>
    <div class="text-center uppercase text-xl font-medium text-fordark" v-else>
      No items to show
    </div>
  </div>
</template>

<script>
import ProjectsViewer from "../components/ProjectsViewer.vue";

export default {
  components: { ProjectsViewer },
  inject: [
    "projects",
    "deleteProject",
    "deleteTask2",
    "finishedTask",
    "getAll",
  ],
  created() {
    this.getAll();
  },
  
};
</script>