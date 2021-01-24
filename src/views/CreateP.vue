<template>
  <div
    class="transition-all shadow-xl bg-darkC rounded-md py-8 px-12 lg:w-3/4 select-none mx-auto"
  >
    <h1
      class="mb-6 w-1/4 mx-auto transition duration-150 ease shadow-lg bg-baseC text-center text-2xl uppercase cursor-pointer font-black py-5 text-lightM rounded-xl hover:bg-baseHover"
      @click="ShowAddProject"
    >
      {{ addNewDynamic }}
    </h1>
    <transition name="fade-in">
      <new-project
        class="transition-all duration-500 ease"
        v-show="formVisible"
        @add-project="addProject"
      ></new-project>
    </transition>
  </div>
</template>

<script>
import NewProject from "../components/NewProject.vue";

export default {
  components: { NewProject },
  inject: ["addProject"],
  computed: {
    addNewDynamic() {
      return this.formVisible ? "HIDE FORM" : "ADD NEW PROJECT";
    },
  },
  data() {
    return {
      formVisible: false,
    };
  },
  methods: {
    ShowAddProject() {
      this.formVisible = !this.formVisible;
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

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-from {
  opacity: 1;
}
</style>