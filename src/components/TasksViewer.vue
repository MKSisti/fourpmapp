<template>
  <!-- <h3>in task viewer</h3> -->
  <div class="w-5/6 mx-auto">
    <div class="break-words w-full grid grid-cols-7 gap-6 items-center">
      <!-- TODO: add idx -->
      <div class="text-forbase font-black text-center">{{ tid + 1 }} .</div>
      <div class="text-forbase font-medium text-left">
        {{ tname }}
      </div>
      <div class=" col-span-2 text-forbase font-medium text-left">
        {{ tdesc }}
      </div>
      <div class="text-forbase font-medium text-right">{{ tduration }} H</div>
      <!-- TODO: move delete task button here and deal with differences in code later -->
      <div @click="deleteTask(tname)" class=" cursor-pointer ml-16 h-8 w-8">
        <box-icon
          size="cssSize"
          class=" transition duration-300  fill-current text-burgundy h-full w-full  hover:text-crimson"
          name="minus-square"
          type="solid"
          v-pre
        ></box-icon>
        <!-- <i class="bx bxs-user-x bx-xs hovers"></i> -->
      </div>
      <div
        class=" cursor-pointer h-10 w-10"
        v-show="tcanBeMarked"
        @click="finishedTask(tname)"
      >
        <transition name="fade-in">
          <div v-if="!tfinished" class="transition duration-300">
            <box-icon
              size="cssSize"
              class="stroke-current text-green-400 w-full h-full stroke-0"
              name="checkbox"
              type="solid"
              v-pre
            ></box-icon>
          </div>
          <div v-else class="transition duration-300">
            <box-icon
              size="cssSize"
              class="fill-current text-green-400  w-full h-full "
              name="checkbox-checked"
              type="solid"
              v-pre
            ></box-icon>
          </div>
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
export default {
  name: "tasks-viewer",
  emits: ["delete-task", "finished-task"],
  props: ["tid", "tname", "tdesc", "tduration", "tseparator", "tcanBeMarked",'tfinished'],
  
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

