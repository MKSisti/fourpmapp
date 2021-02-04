<template>
  <base-card>
    <new-project @add-project="addProject"></new-project>
  </base-card>
</template>

<script>
import NewProject from "../components/NewProject.vue";
// import axios from "axios";


export default {
  components: { NewProject },
  methods: {
    async addProject(P) {
      // await this.creatP(P);
      await this.$store.dispatch("createP", P);
      this.$router.push("/");
    },
  },
};
</script>

