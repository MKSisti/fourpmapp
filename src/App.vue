<template>
  <section class="w-full space-y-8 select-none">
    <nav-bar></nav-bar>
    <!-- class="transition-all duration-500 ease" -->
    <router-view :key="this.$route.fullpath" v-slot="{ Component }">
      <suspense>
        <transition name="slide" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </suspense>
    </router-view>
  </section>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  components: { NavBar },
  name: "App",

  async created() {
    await this.$store.dispatch("getAll");
  },
};
</script>

<style>
@import url("./assets/css/main.css");

.slide-enter-from {
  transform: translateX(-30px);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

::-webkit-scrollbar {
  width: 9px;
  height: 9px;
}
::-webkit-scrollbar-thumb {
  background: #57a9e9;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #6aceff;
}
::-webkit-scrollbar-track {
  background: rgb(55, 118, 170);
  border-radius: 10px;
}
</style>
