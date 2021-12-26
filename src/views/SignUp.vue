<template>
  <div class="w-screen">
    <div class="w-1/2 m-auto">
      <label class="text-lighter mb-1 block uppercase font-bold text-2xl" for="displayName">DisplayName</label>
      <input
        v-model="displayName"
        class="placeholder-gray-500 placeholder-opacity-50 rounded-md w-full py-4 px-4 bg-darker font-semibold text-xl text-lighter focus:outline-none border border-lightC"
        type="text"
        id="displayName"
        name="displayName"
        placeholder="User1234"
        autocomplete="off"
        required
      />
    </div>
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
      <label class="text-lighter mb-1 block uppercase font-bold text-2xl" for="password">Password</label>
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
        <base-button @click="SignUp" :type="'forProject'">
        Sign Up
        </base-button>
    </div>
    <div class="w-1/2 m-auto py-12 px-2 text-lighter">
        Have an account ? <router-link :to="{name:'signIn'}" > Log In :</router-link>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "SignUp",
  data(){
      return{
          email:"",
          password:"",
          displayName:"",
      }
  },
  methods:{
      ...mapActions("user",['SignUser']),
      async SignUp(){
          if (this.email.length>0 && this.password.length >= 8) {
              await this.SignUser({
                  email : this.email,
                  password : this.password,
                  displayName: this.displayName,
              });
          }
      },
      confirm(){
          console.log("yeet");
      }
  }
};
</script>
