<template>
  <div class="mb-12">
    <!-- <h2>in project viewer</h2> -->
    <div class="break-words grid grid-cols-7 items-center mb-3 w-full">
      <div class="col-span-1 text-lightL text-xl font-bold uppercase">
        {{ pname }}
      </div>
      <div class="col-span-4 h-5 bg-prgrs mt-1 rounded-full">
        <div
          class="ease-in-out transition-all duration-200 h-5 rounded-full"
          :style="pcustomW"
          :class="successPrgrs"
        ></div>
      </div>

      <div @click="toggleShowTasks" class=" mx-auto cursor-pointer  h-8 w-8  transition duration-700 hover: " :class="flippedArrows">
        <box-icon
          size="cssSize"
          class="transition duration-300 fill-current text-blue-900 h-full w-full hover:text-blue-800 "
          name="down-arrow-square"
          type="solid"
          v-pre
        ></box-icon>
        <!-- <i class="bx bxs-user-x bx-xs hovers"></i> -->
      </div>
      
      <div @click="deletePrj(pname)" class=" mx-auto cursor-pointer  h-8 w-8">
        <box-icon
          size="cssSize"
          class="transition duration-300 fill-current text-red-900 h-full w-full hover:text-red-800"
          name="trash-alt"
          type="solid"
          v-pre
        ></box-icon>
        <!-- <i class="bx bxs-user-x bx-xs hovers"></i> -->
      </div>
    </div>

    <!-- <div>{{ pdesc }}</div> -->
    <transition name="fade-in">
      <div class="transition-all duration-300" v-show="showTasks">
        <tasks-viewer
          @finished-task="finishedTask"
          @delete-task="deleteTask"
          class="px-12"
          v-for="(task, idx) in ptasks"
          :key="idx+task.name+task.desc"
          :tid="idx"
          :tname="task.name"
          :tdesc="task.desc"
          :tduration="task.duration"
          :tfinished="task.finished"
          :tseparator="false"
          :tcanBeMarked="true"
        ></tasks-viewer>
      </div>
    </transition>
    <transition name="fade-in">
      <div
        v-show="showTasks"
        class="w-full  mx-auto bg-gradient-to-r from-green-500 to-blue-500 h-1 mt-5 rounded-full transition-all duration-300"
      ></div>
    </transition>
  </div>
</template>

<script>
import tasksViewer from "./TasksViewer.vue";

export default {
  components: { tasksViewer },
  emits: ["delete-project", "delete-ptask", "finished-ptask",'project-changed'],
  props: ["pname", "pdesc", "ptasks", "pcustomW"],
  name: "projects-viewer",
  data() {
    return {
      showTasks: false,
    };
  },
  computed: {
    successPrgrs() {
      
      return this.pcustomW.includes('100') ? 'bg-green-400' : 'bg-lightC ';
    },
    flippedArrows(){
      return this.showTasks? 'transform rotate-180' : '';
    }
  },
  methods: {
    deletePrj(name) {
      this.$emit("delete-project", name);
      this.$emit('project-changed');
    },
    deleteTask(name) {
      // console.log("from project viwer " + name + " " + this.pname);
      this.$emit("delete-ptask", name, this.pname);
      this.$emit('project-changed');
    },
    finishedTask(name) {
      this.$emit("finished-ptask", name, this.pname);
      this.$emit('project-changed');
      // var i = 0;
      // for (let idx = 0; idx < this.ptasks.length; idx++) {
      //   if (this.ptasks[idx].finished == true) {
      //     i++;
      //   }
      // }
      // var w = (i / this.ptasks.length) * 100;
      // this.customW = " width: " + w + "%";
      // console.log(W);
    },
    toggleShowTasks() {
      this.showTasks = !this.showTasks;
    },
  },
};
</script>

