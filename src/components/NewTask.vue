<template>
  <div class="mx-8">
    <div class="flex flex-row space-x-2 mb-4 xl:space-x-12">
      <div class="w-1/3">
        <label class="text-lightL block uppercase font-bold text-lg" for="task-name"
          >Name</label
        >
        <input
          v-model="name"
          placeholder="task name"
          :class="makeRed"
          class="rounded-md w-full py-4 px-4 bg-darkM text-lightL text-xl font-semibold focus:outline-none border-2 border-lightC focus:border-lightM"
          type="text"
          id="task-name"
          name="task-name"
          maxlength="32"
          autocomplete="off"
        />
      </div>
      <div class="flex-grow">
        <label class="text-lightL block uppercase font-bold text-lg" for="task-desc"
          >Description</label
        >
        <input
          v-model="desc"
          placeholder="task description"
          :class="makeRed"
          class="rounded-md w-full py-4 px-4 bg-darkM text-lightL text-xl font-semibold focus:outline-none border-2 border-lightC focus:border-lightM"
          type="text"
          id="task-desc"
          name="task-desc"
          maxlength="64"
          autocomplete="off"
        />
      </div>
    </div>
    <div class="flex flex-row space-x-2 mb-4 mt-2 xl:space-x-12">
      <div class="w-1/2">
        <label
          class="text-lightL block uppercase font-bold text-lg"
          for="duration"
          >Duration<i class="text-sm"> ( in hours )</i></label
        >
        <input
          v-model="duration"
          :class="makeRed"
          class="rounded-md w-full py-4 px-4 bg-darkM text-lightL text-xl font-semibold focus:outline-none border-2 border-lightC focus:border-lightM"
          type="number"
          min="0"
          max="168"
          step="0.25"
          id="duration"
          name="duration"
          autocomplete="off"
        />
      </div>

      <div class="w-1/2 mt-auto">
        <h2
          @click="confirmTask"
          class="transition duration-150 ease-in-out shadow-lg mx-auto h-full bg-lightC text-center text-xl uppercase cursor-pointer font-bold p-5 text-lightM rounded-xl hover:bg-lightHover"
        >
          <!-- <div @click="confirmTask" class="  bg-light flex-col text-center rounded-lg cursor-pointer h-full"> -->
          <!-- <div class="btnIcon"></div> -->
          Add task
          <!-- <h2 class="mx-auto text-lightM font-bold text-2xl">Add Task</h2> -->
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "task",
  emits: ["add-task"],
  data() {
    return {
      name: null,
      desc: null,
      duration: 0,
      redAccent: false,
    };
  },
  computed: {
    makeRed() {
      return this.redAccent ? "border-burntSienna" : "border-lightC";
    },
  },
  methods: {
    validateTask() {
      if (!this.name || !this.desc || this.duration == 0) {
        this.redAccent = true;
        return false;
      } else {
        this.redAccent = false;
        return true;
      }
    },
    confirmTask() {
      if (this.validateTask()) {
        const newTask = {
          name: this.name,
          desc: this.desc,
          duration: this.duration,
        };
        this.name = "";
        this.desc = "";
        this.duration = 0;

        this.$emit("add-task", newTask);
      }
    },
    // deleteTask() {
    //   this.$emit("delete-task", this.name);
    // },
  },
};
</script>

<style></style>
