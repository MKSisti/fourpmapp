<template>
  <div class="overflow-hidden">
    <transition appear name="fade-in">
      <div
        v-if="errors.length"
        class="flex flex-col mx-12 bg-burntSienna p-6 rounded mb-4"
      >
        <span
          class="text-kobe font-medium ml-4"
          v-for="(error, idx) in errors"
          :key="idx"
          ><box-icon
            size="cssSize"
            class="fill-current h-3 w-3"
            type="solid"
            name="circle"
          ></box-icon>
          {{ error }}
        </span>
      </div>
    </transition>
    <div class="flex justify-center space-x-6 mb-8 mx-12 lg:space-x-12">
      <div class="w-1/2">
        <label
          class="text-lightL mb-1 block uppercase font-bold text-2xl"
          for="project-name"
          >Name</label
        >
        <input
          v-model="name"
          class="rounded-md w-full py-4 px-4 bg-darkest focus:bg-darkL font-semibold text-xl text-lightL focus:outline-none border-2 border-lightC focus:border-lightM"
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
          class="text-lightL mb-1 block uppercase font-bold text-2xl"
          for="project-desc"
          >Description</label
        >
        <input
          v-model="desc"
          class="rounded-md w-full py-4 px-4 bg-darkest focus:bg-darkL text-lightL font-semibold text-xl focus:outline-none border-2 border-lightC focus:border-lightM"
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

    <div class="shadow-inner bg-baseC rounded-xl p-3">
      <h1 class="text-forbase text-xl uppercase font-bold mb-4">
        add tasks to the project
      </h1>
      <new-task @add-task="addTask"></new-task>

      <div
        v-if="tasks.length === 0"
        class="text-center text-forbase uppercase text-xl font-medium"
      >
        No Tasks yet, try adding some using the form above.
      </div>
      <div v-else class="mt-3 mx-24">
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
          <!-- <div @click="deleteTask(task.name)" class="ml-12 cursor-pointer">
             <svg class="h-6 w-6 fill-current text-green-600" src="../assets/icons/trash.svg" alt="X"  > 
            <svg class="fill-current text-red-900 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path
                
                d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"
              />
            </svg>

             <i class="bx bxs-user-x bx-xs hovers"></i> 
          </div> -->
        </div>
      </div>
    </div>

    <div class="">
      <!-- <div @click="confirmProject" class="">
         <div class="btnIcon"></div> 
        <div class="">Confirm Project</div>
      </div> -->
      <h1
        class="shadow-xl transition duration-150 ease-in-out shadow-lg mx-auto mt-4 bg-baseC text-center text-2xl uppercase cursor-pointer font-black p-5 text-lightM rounded-xl hover:bg-baseHover"
        @click="confirmProject"
      >
        Confirm Project
      </h1>
    </div>
  </div>
</template>

<script>
// import newTask from "NewTask.vue";
import NewTask from "./NewTask.vue";
import TasksViewer from "./TasksViewer.vue";

export default {
  name: "project",
  emits: ["add-project", "project-changed"],
  components: { NewTask, TasksViewer },
  data() {
    return {
      name: null,
      desc: null,
      tasks: [],
      errors: [],
      completion: "width: 0%",
    };
  },
  methods: {
    validateData() {
      this.errors = [];
      if (this.name && this.desc && this.tasks.length > 0) {
        // console.log('from val true');
        return true;
      }

      if (!this.name) {
        this.errors.push("Please add a project name");
      }
      if (!this.desc) {
        this.errors.push("Please add a project description");
      }
      if (this.tasks.length == 0) {
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

      this.tasks.push(newT);
    },
    confirmProject() {
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
        this.$emit("project-changed");
        console.log("all good");
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