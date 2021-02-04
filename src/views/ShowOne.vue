<template>
  <base-card>
    <div class="space-y-8 uppercase">
      <h1 class="text-center text-fordark text-3xl font-bold mb-12 ">
        {{ name }}
      </h1>
      <h1 class="block font-medium text-darkSkyBlue text-2xl">Total Progression :</h1>
      <div class="col-span-4 h-5 w-5/6 mx-auto bg-prgrs rounded-full">
        <div
          class="ease-in-out transition-all duration-200 h-5 rounded-full"
          :style="completion"
          :class="successPrgrs"
        ></div>
      </div>
      <div>
        <h1 class="block font-medium text-darkSkyBlue text-2xl">Tasks :</h1>
        <tasks-viewer
          v-for="(task, idx) in tasks"
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
import axios from "axios";

export default {
  name: "ProjectViewer",
  components: { TasksViewer },
  props: ["ProjectId"],
  data() {
    return {
      completion: "",
      desc: "",
      name: "",
      tasks: [],
    };
  },
  computed: {
    successPrgrs() {
      return this.completion.includes("100") ? "bg-green-400" : "bg-lightC ";
    },
  },
  methods: {
    async getOne(id) {
      try {
        // this.err = false;
        // this.loading = true;
        const One = await axios(
          "https://vue-test-6edc5.firebaseio.com/projects/" + id + ".json",
          { timeout: 3000 }
        );
        this.completion = One.data.completion;
        this.desc = One.data.desc;
        this.name = One.data.name;
        this.tasks = One.data.tasks;
      } catch (error) {
        console.error(error.message);
      }
    },
  },
  async created() {
    await this.getOne(this.ProjectId);
  },
};
</script>