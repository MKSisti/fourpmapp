<template>
  <div class="">
    <transition appear name="fade-in">
      <div
        v-if="errors.length"
        class="flex flex-col mx-12 bg-burntSienna p-6 rounded mb-4"
      >
        <span
          class="text-kobe font-medium ml-4"
          v-for="(error, idx) in errors"
          :key="idx"
        >
          
            <base-icon name="circle" w="0.5rem" h="0.5rem" class="stroke-current stroke-3 text-darkC inline-block mb-1" />
          
          {{ error }}
        </span>
      </div>
    </transition>
    <div class="flex justify-center space-x-6 mb-8 mx-12 lg:space-x-12">
      <div class="w-1/2">
        <label
          class="text-lighter mb-1 block uppercase font-bold text-2xl"
          for="project-name"
          >Name</label
        >
        <input
          v-model="name"
          class="placeholder-gray-500 placeholder-opacity-50 rounded-md w-full py-4 px-4 bg-darker font-semibold text-xl text-lighter focus:outline-none border border-lightC"
          type="text"
          id="project-name"
          name="project-name"
          placeholder="project name"
          autocomplete="off"
          minlength="3"
          maxlength="32"
          required
        />
      </div>
      <div class="w-1/2">
        <label
          class="text-lighter mb-1 block uppercase font-bold text-2xl"
          for="project-desc"
          >Description</label
        >
        <input
          v-model="desc"
          class="placeholder-gray-500 placeholder-opacity-50 rounded-md w-full py-4 px-4 bg-darker font-semibold text-xl text-lighter focus:outline-none border border-lightC"
          type="text"
          id="project-desc"
          name="project-desc"
          placeholder="project description"
          autocomplete="off"
          minlength="3"
          maxlength="32"
          required
        />
      </div>
    </div>

    <base-card
      :color="'bg-darkC'"
      :shadow="'shadow-inner'"
      :padding="'p-3'"
      :width="'lg:w-5/6'"
    >
      <h1 class="text-lighter text-xl uppercase font-bold mb-4">
        add tasks to the project
      </h1>
      <new-task @add-task="addTask"></new-task>

      <div
        v-if="tasks.length === 0"
        class="text-center text-lighter uppercase text-xl font-medium"
      >
        No Tasks yet, try adding some using the form above.
      </div>
      <div v-else class="mt-3 mx-24 overflow-auto max-h-40">
        <div
          v-for="(task, idx) in tasks"
          :key="idx"
          class="flex flex-row w-full"
        >
          <tasks-viewer
            @delete-task="deleteTask"
            :tid="idx"
            :tname="task.name"
            :tdesc="task.desc"
            :tduration="task.duration"
            :tseparator="true"
            :tcanBeMarked="false"
          ></tasks-viewer>
        </div>
      </div>
    </base-card>
    <!-- </div> -->
    <base-button @click="confirmProject" :type="'forProject'">
      Confirm Project
    </base-button>
  </div>
</template>

<script>
import BaseButton from "./BaseComponents/BaseButton.vue";
import BaseCard from "./BaseComponents/BaseCard.vue";
import BaseIcon from "./BaseComponents/BaseIcon.vue";
// import newTask from "NewTask.vue";
import NewTask from "./NewTask.vue";
import TasksViewer from "./TasksViewer.vue";

import {v4 as uuidv4} from "uuid";
import _ from 'lodash';

export default {
  name: "project",
  emits: ["add-project", "project-changed"],
  components: { NewTask, TasksViewer, BaseCard, BaseButton, BaseIcon },
  data() {
    return {
      name: null,
      desc: null,
      tasks: {},
      errors: [],
      completion: "width: 0%",
    };
  },
  methods: {
    validateData() {
      this.errors = [];
      if (this.name && this.desc && !_.isEmpty(this.tasks)) {
        // console.log('from val true');
        return true;
      }

      if (!this.name) {
        this.errors.push("Please add a project name");
      }
      if (!this.desc) {
        this.errors.push("Please add a project description");
      }
      if (_.isEmpty(this.tasks)) {
        this.errors.push("Please add at least one task");
      }
      // console.log('from val false');
      return false;
    },
    addTask(T) {
      const newT = {
        name: T.name,
        desc: T.desc,
        duration: T.duration,
        finished: false,
      };

      this.tasks[uuidv4()] = newT;
    },
    confirmProject() {
      console.log("confirm");
      if (this.validateData()) {
        const newP = {
          name: this.name,
          desc: this.desc,
          tasks: this.tasks,
          completion: this.completion,
        };
        this.tasks = [];
        this.name = "";
        this.desc = "";
        this.$emit("add-project", newP);
        // this.$emit("project-changed");
        // console.log("all good");
      } else {
        console.log("nope");
      }
    },
    deleteTask(name) {
      this.tasks = this.tasks.filter((task) => task.name !== name);
    },
  },
};
</script>

<style>
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
</style>