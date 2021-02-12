<template>
  <div class="w-full bg-darkC h-32 top-0">
    <div class="float-left h-full grid">
      <!-- <h1 class="text-5xl text-lightC font-black my-auto ml-24">4PM</h1> -->
      <img
        src="@/assets/icons/log.svg"
        alt="4pm"
        class="my-auto ml-24 h-20 w-20"
      />
    </div>
    <div
      class="float-right text-lighter h-full grid grid-cols-3 mr-32 text-center space-x-4"
    >
      <div v-if="state" class="my-auto font-semibold text-2xl uppercase">
        <router-link to="/">Home</router-link>
      </div>
      <div v-if="state" class="my-auto font-semibold text-2xl uppercase">
        <router-link to="/add">Add Projects</router-link>
      </div>
      <div v-if="!state" class="my-auto font-semibold text-2xl uppercase">
        <h1
          @click="logIn"
          class="py-12 px-2 hover:bg-bl-d hover:text-lighter cursor-pointer"
        >
          Login
        </h1>
      </div>
      <div v-else class="my-auto font-semibold text-2xl uppercase">
        <h1
          @click="logOut"
          class="py-12 px-2 hover:bg-bl-d hover:text-lighter cursor-pointer"
        >
          <span class="text-sm font-thin">Hi,{{ userInfo.name }}</span>
          LogOut
        </h1>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "navbar",
  methods: {
    logIn() {
      this.$store.dispatch("user/logIn");
    },
    logOut() {
      this.$store.dispatch("user/logOut");
    },
  },
  computed: {
    ...mapGetters({
      state: "user/getloggedState",
      userInfo: "user/getUserInfo",
    }),
  },
};
</script>

<style >
a:hover,
a:active,
a.router-link-active {
  @apply text-lightHover;
}
</style>