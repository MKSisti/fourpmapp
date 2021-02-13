<template>
  <div class="w-full bg-darkC h-32 top-0">
    <div class="float-left h-full grid">
      <!-- <h1 class="text-5xl text-lightC font-black my-auto ml-24">4PM</h1> -->
      <!-- <img
        src="@/assets/icons/log.svg"
        alt="4pm"
        class="my-auto ml-24 h-20 w-20"
      /> -->
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        y="0"
        viewBox="0 0 1016 819"
        xml:space="preserve"
        class="my-auto ml-24 fill-current text-bl-l w-24 h-2w-24"
      >
        <defs />
        <g id="XMLID_1081_">
          <g id="XMLID_1082_">
            <path id="XMLID_9_" class="st0" d="M32.1 29.4h30.8" />
            <path id="XMLID_6_" class="st0" d="M62.9 193.7H32.1" />
            <path id="XMLID_4_" d="M155.3 29.4h30.8" />
            <path id="XMLID_3_" d="M186.1 193.7h-30.8" />
            <path id="XMLID_2_" d="M155.3 29.4h-30.8" />
            <path id="XMLID_1_" class="st0" d="M93.7 29.4H62.9" />
          </g>
        </g>
        <path
          id="XMLID_8_"
          d="M801.6 13.8L519.2 202c-6.8 4.5-15.6 4.5-22.4 0L214.4 13.8c-4.2-2.8-9.1-4.3-14.1-4.3H33.4C19.4 9.5 8 20.9 8 34.9V784c0 14.1 11.4 25.4 25.4 25.4h149.1c14.1 0 25.4-11.4 25.4-25.4V620.3c0-6.8 3.4-13.1 9-16.8l291-194 150-100 110.4-73.6c16.9-11.3 39.6.8 39.6 21.2v527c0 14.1 11.4 25.4 25.4 25.4h149.1c14.1 0 25.4-11.4 25.4-25.4V34.9c0-14.1-11.4-25.4-25.4-25.4H815.7c-5 0-9.9 1.5-14.1 4.3zM208 371.7V247.3c0-16.1 18-25.8 31.4-16.8l93.4 62.2c12 8 12 25.6 0 33.6l-93.4 62.2c-13.4 9-31.4-.6-31.4-16.8z"
        />
      </svg>
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
        <div class="group relative px-2">
          <span class="text-lg font-light cursor-pointer"
            >Hi, {{ userInfo.name }}</span
          >
          <base-icon
            :name="'arrow-down'"
            h="1rem"
            w="1rem"
            class="inline fill-current text-lighter ml-2 cursor-pointer"
          />
          <h1
            @click="logOut"
            class="duration-300 transition absolute hidden right-0 py-4 px-2 w-32 bg-bl-d hover:bg-bl-dh hover:text-lighter cursor-pointer group-hover:block"
          >
            <span class="text-xl font-light hover:text-rd">LogOut</span>
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import BaseIcon from "./BaseComponents/BaseIcon.vue";

export default {
  components: { BaseIcon },
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