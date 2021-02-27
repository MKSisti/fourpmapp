<template>
  <base-card>
    <div class="space-y-8 uppercase">
      <h1 class="text-center text-lighter text-3xl font-bold mb-12">
        {{ project.name }}
      </h1>
      <div class="max-w-max space-y-4">
        <h1
          @click="showShare = !showShare"
          class="font-medium text-darkSkyBlue text-xl py-2 px-4 bg-bl-d cursor-pointer inline"
        >
          Share with
        </h1>
        <div class="flex flex-row space-x-4" v-if="showShare">
          <input
            class="text-lighter font-medium bg-darkC border border-lightC px-2 py-1 focus:outline-none min-w-3/4"
            type="text"
            name="shareWith"
            v-model="shareWith"
          />
          <h1
            @click="shareP"
            class="font-medium text-darkSkyBlue text-xl py-2 px-4 bg-bl-d cursor-pointer"
          >
            Share
          </h1>
        </div>
      </div>
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
        <div>
          <h1 class="inline-blocklock font-medium text-darkSkyBlue text-2xl">
            Tasks :
            <base-icon
              h="1.5rem"
              w="1.5rem"
              name="add"
              class="fill-current text-grn inline mb-1 ml-4 cursor-pointer"
              @click="toggleShowAddTask"
            />
          </h1>
          <transition name="fade">
            <div v-if="showAddTask" class="w-5/6 mx-auto">
              <div class="flex flex-wrap flex-row justify-start w-full mb-8">
                <div class="flex-1">
                  <label class="block text-lighter" for="name">name</label>
                  <input
                    class="text-lighter font-medium bg-darkC border border-lightC px-2 py-1 focus:outline-none min-w-3/4"
                    type="text"
                    name="name"
                    id="name"
                    v-model="tname"
                  />
                </div>
                <div class="flex-1">
                  <label class="block text-lighter" for="desc"
                    >description</label
                  >
                  <input
                    class="text-lighter font-medium bg-darkC border border-lightC px-2 py-1 focus:outline-none min-w-3/4"
                    type="text"
                    name="desc"
                    id="desc"
                    v-model="tdesc"
                  />
                </div>
                <div class="flex-1">
                  <label class="block text-lighter" for="duration"
                    >duration</label
                  >
                  <input
                    class="text-lighter font-medium bg-darkC border border-lightC px-2 py-1 focus:outline-none min-w-3/4"
                    type="number"
                    name="duration"
                    id="duration"
                    v-model="tdura"
                  />
                </div>
                <div
                  @click="addNewTask"
                  class="flex-1 bg-bl-d hover:bg-bl-dh cursor-pointer w-full mt-4 sm:w-1/2 sm:mt-auto"
                >
                  <div
                    class="text-center font-medium translay px-2 py-3 text-lighter text-xl"
                  >
                    ADD
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <tasks-viewer
          @finished-task="finishedT"
          @delete-task="deleteT"
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
import BaseIcon from "../components/BaseComponents/BaseIcon.vue";
import TasksViewer from "../components/TasksViewer.vue";
import { mapActions, mapGetters } from "vuex";
// import axios from "axios";

export default {
  name: "ProjectViewer",
  components: { TasksViewer, BaseIcon },
  props: ["ProjectId"],
  computed: {
    ...mapGetters(["getProject"]),
    successPrgrs() {
      var w = this.project.completion.match(/\d+/)[0];
      // console.log(w);
      if (w < 50) {
        return "bg-rd";
      } else if (w < 100) {
        return "bg-bl-dh";
      }
      return "bg-grn";
    },
    project() {
      return this.getProject(this.ProjectId);
    },
  },
  data() {
    return {
      showShare: false,
      showAddTask: false,
      shareWith: "",
      tname: "",
      tdesc: "",
      tdura: 0,
    };
  },
  methods: {
    ...mapActions(["addTask", "finishedTask", "deleteTask", "shareProject"]),
    async shareP() {
      this.shareWith.length > 0
        ? await this.shareProject({ id: this.ProjectId, email: this.shareWith })
        : null;
    },
    addNewTask() {
      if (this.tname && this.tdesc && this.tdura > 0) {
        const newTask = {
          name: this.tname,
          desc: this.tdesc,
          duration: this.tdura,
          finished: false,
        };
        this.tname = "";
        this.tdesc = "";
        this.tdura = 0;
        console.log(newTask);
        this.addTask({
          id: this.ProjectId,
          next: this.project.tasks ? this.project.tasks.length : "0",
          task: newTask,
        });
      }
    },
    toggleShowAddTask() {
      this.showAddTask = !this.showAddTask;
    },
    async finishedT(taskname) {
      let tmp = {
        taskName: taskname,
        projectId: this.ProjectId,
      };
      await this.finishedTask(tmp);
    },

    async deleteT(taskname) {
      let tmp = {
        taskName: taskname,
        projectId: this.ProjectId,
      };
      await this.deleteTask(tmp);
    },
  },
};
</script>

<style scoped>
.fade-enter-from {
  /* transform: translateX(-30px); */
  opacity: 0;
}
.fade-leave-to {
  /* transform: translateX(-50px); */
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}
</style>