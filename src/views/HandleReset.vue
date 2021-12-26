<template>
  <div class="w-screen">
    <div class="w-1/2 m-auto">
      <label class="text-lighter mb-1 block uppercase font-bold text-2xl" for="email">Email</label>
      <input
        v-model="email"
        class="placeholder-gray-500 placeholder-opacity-50 rounded-md w-full py-4 px-4 bg-darker font-semibold text-xl text-lighter focus:outline-none border border-lightC"
        type="text"
        id="email"
        name="email"
        placeholder="email@example.com"
        autocomplete="off"
        required
      />
    </div>
    <div class="w-1/2 m-auto">
      <label class="text-lighter mb-1 block uppercase font-bold text-2xl" for="password">New Password</label>
      <input
        v-model="password"
        class="placeholder-gray-500 placeholder-opacity-50 rounded-md w-full py-4 px-4 bg-darker font-semibold text-xl text-lighter focus:outline-none border border-lightC"
        type="text"
        id="password"
        name="password"
        autocomplete="off"
        required
      />
    </div>
    <div class="w-1/2 m-auto">
      <base-button @click="Save" :type="'forProject'" >
      Save
      </base-button>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "HandleReset",
  data(){
      return{
          email:"",
          password:"",
      }
  },
  conputed:{
      eventnone(){
          return this.loading? 'pointer-events-none':'';
      }
  },
  methods:{
      ...mapActions("user",['ResetPwd']),
      async Save(){
          await this.ResetPwd({
              email:this.email,
              code:this.code,
          });
      },
  }
};
</script>
