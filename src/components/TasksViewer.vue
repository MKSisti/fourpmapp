<template>
  <!-- <h3>in task viewer</h3> -->
  <div class="w-5/6 mx-auto">
    <div class="break-words w-full grid grid-cols-7 gap-6 items-center">
      <!-- TODO: add idx -->
      <div class="text-lighter font-black text-center">{{ tid + 1 }} .</div>
      <div class="text-lighter font-medium text-left">
        {{ tname }}
      </div>
      <div class="col-span-2 text-lighter font-medium text-left">
        {{ tdesc }}
      </div>
      <div class="text-lighter font-medium text-right">{{ tduration }} H</div>
      <div
        @click="deleteTask(tname)"
        class="cursor-pointer ml-7 lg:ml-16 h-8 w-8"
      >
        <base-icon
          h="32"
          w="32"
          name="minus"
          class="fill-current text-rd"
        />
      </div>
      <div
        class="cursor-pointer h-8 w-8"
        v-show="tcanBeMarked"
        @click="finishedTask(tname)"
      >
        <transition name="fade-in">
          <div>
            <base-icon
              h="32"
              w="32"
              :name="tfinished ? 'check-checked' : 'check-blank'"
              :class="tfinished ? 'fill-current text-grn' : 'text-lightC stroke-current stroke-1'"
            />
          </div>
          <!-- <div v-if="!tfinished" class="transition duration-300">
            <base-icon h="32" w="32" name="check-blank" />
          </div>
          <div v-else class="transition duration-300">
            <base-icon h="32" w="32" name="check-checked" />
          </div> -->
        </transition>
      </div>
    </div>
    <div
      v-show="tseparator"
      class="mx-auto w-full bg-lightC h-1 mt-2 mb-2 rounded-full"
    ></div>
  </div>
</template>

<script>
import BaseIcon from "./BaseComponents/BaseIcon.vue";
export default {
  components: { BaseIcon },
  name: "tasks-viewer",
  emits: ["delete-task", "finished-task"],
  props: [
    "tid",
    "tname",
    "tdesc",
    "tduration",
    "tseparator",
    "tcanBeMarked",
    "tfinished",
  ],

  methods: {
    deleteTask(name) {
      // console.log("delete task");
      this.$emit("delete-task", name);
      // console.log('from task viewer '+name);
    },
    finishedTask(name) {
      this.finished = !this.finished;
      this.$emit("finished-task", name);
    },
  },
};
</script>

