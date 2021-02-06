<template>
  <base-card>
    <div class="space-y-8 uppercase">
      <h1 class="text-center text-fordark text-3xl font-bold mb-12">
        {{ project.name }}
      </h1>
      <h1 class="block font-medium text-darkSkyBlue text-2xl">
        Total Progression :
      </h1>
      <div class="col-span-4 h-5 w-5/6 mx-auto bg-prgrs rounded-full">
        <div
          class="ease-in-out transition-all duration-200 h-5 rounded-full"
          :style="project.completion"
          :class="successPrgrs"
        ></div>
      </div>
      <div>
        <h1 class="block font-medium text-darkSkyBlue text-2xl">Tasks :</h1>
        <tasks-viewer
          @finished-task="finishedTask"
          @delete-task="deleteTask"
          v-for="(task, idx) in project.tasks"
          :key="idx + task.name + ProjectId"
          :tid="idx"
          :tname="task.name"
          :tdesc="task.desc"
          :tduration="task.duration"
          :tfinished="task.finished"
          :tseparator="false"
          :tcanBeMarked="true"
        ></tasks-viewer>
      </div>
    </div>
  </base-card>
</template>

<script>
import TasksViewer from "../components/TasksViewer.vue";
// import axios from "axios";

export default {
  name: "ProjectViewer",
  components: { TasksViewer },
  props: ["ProjectId"],
  data() {
    return {};
  },
  computed: {
    successPrgrs() {
      return this.project.completion.includes("100")
        ? "bg-green-400"
        : "bg-lightC ";
    },
    project() {
      return this.$store.getters.getProject(this.ProjectId);
    },
  },
  methods: {
    async finishedTask(taskname) {
      let tmp = {
        taskName: taskname,
        projectId: this.ProjectId,
      };
      await this.$store.dispatch("finishedTask", tmp);
    },

    async deleteTask(taskname) {
      let tmp = {
        taskName: taskname,
        projectId: this.ProjectId,
      };
      await this.$store.dispatch("deleteTask", tmp);
    },
  },
  
};
</script>