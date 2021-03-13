<template>
  <div class="mb-12">
    <div class="break-words grid grid-cols-8 items-center mb-3 w-full">
      <div
        class="truncate col-span-2 text-lightC text-xl font-bold uppercase"
      >
        <router-link :to="{ name: 'project', params: { ProjectId: pid } }">{{
          pname
        }}</router-link>
        <span>
          <h3 class="text-sm font-thin italic">Owner: {{ownerMail}}</h3>
        </span>
      </div>
      <!-- <div
        class="truncate col-span-2 text-lightC text-xl font-bold uppercase"
      >
        {{ pname }}
      </div> -->
      <div class="col-span-4 h-5 bg-prgrs mt-1 rounded-full">
        <div
          class="ease-in-out transition-all duration-200 h-5 rounded-full"
          :style="pcustomW"
          :class="successPrgrs"
        ></div>
      </div>

      <div
        @click="toggleShowTasks"
        class="mx-auto cursor-pointer h-8 w-8 transition duration-700"
        :class="flippedArrows"
      >
        <base-icon
          h="32"
          w="32"
          name="arrow-down"
          class="transition duration-300 fill-current text-lighter"
        />
      </div>

      <div
        v-if=" getUID == owner"
        @click="deletePrj"
        class="mx-auto cursor-pointer h-8 w-8"
      >
        <base-icon
          h="32"
          w="32"
          name="delete"
          class="transition duration-300 fill-current text-rd"
        />
      </div>
    </div>
    <div v-if="ptasks && Object.keys(ptasks)">
      <transition name="fade-in">
        <div class="transition-all duration-500 ease-in-out" v-show="showTasks">
          <tasks-viewer
            @finished-task="finishedTask"
            @delete-task="deleteTask"
            class="px-12"
            v-for="(task, idx) in ptasks"
            :key="idx + task.name + pid"
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
    </div>
    <transition name="fade-in">
      <div
        v-show="showTasks"
        class="w-full mx-auto bg-gradient-to-r from-gray-600 to-gray-800 h-1 mt-5 rounded-full transition-all duration-300"
      ></div>
    </transition>
  </div>
</template>

<script>
import BaseIcon from "./BaseComponents/BaseIcon.vue";
import tasksViewer from "./TasksViewer.vue";
import {users} from '../firebase';
import {mapGetters} from 'vuex'
// import _ from 'lodash'

export default {
  components: { tasksViewer, BaseIcon },
  emits: [
    "delete-project",
    "delete-ptask",
    "finished-ptask",
    "project-changed",
  ],
  props: ["pname", "pdesc", "ptasks", "pcustomW", "pid", "owner"],
  name: "projects-viewer",
  data() {
    return {
      showTasks: false,
      ownerMail: "",
    };
  },
  computed: {
    successPrgrs() {
      var w = this.pcustomW.match(/\d+/)[0];
      // console.log(w);
      if (w < 50) {
        return "bg-rd";
      } else if (w < 100) {
        return "bg-bl-dh";
      }
      return "bg-grn";
    },
    flippedArrows() {
      return this.showTasks ? "transform rotate-180" : "";
    },
    ...mapGetters("user",["getUID"]),
  },
  methods: {
    deletePrj() {
      this.$emit("delete-project", this.pid);
      // this.$emit("project-changed");
    },
    deleteTask(id) {
      this.$emit("delete-ptask", id, this.pid);
      // this.$emit("project-changed");
    },
    finishedTask(id) {
      this.$emit("finished-ptask", id, this.pid);
      // console.log(name + ' ' + this.pid);
      // this.$emit("project-changed");
    },
    toggleShowTasks() {
      this.showTasks = !this.showTasks;
    },
    async getOwnerMeta(){
      await users.child(this.owner+"/email").get().then(async ds => {
        this.ownerMail = ds.val();
      });
      
    }
  },
  async mounted(){
    await this.getOwnerMeta();
  }
};
</script>

