<template>
  <base-card>
    <new-project @add-project="addProject"></new-project>
  </base-card>
</template>

<script>
import NewProject from "../components/NewProject.vue";
import axios from "axios";

export default {
  components: { NewProject },
  methods: {
    async creatP(P) {
      try {
        await axios.post(
          "https://vue-test-6edc5.firebaseio.com/projects.json",
          P,
          { timeout: 3000 }
        );
      } catch (error) {
        console.error(error.message);
      }
    },

    async addProject(P) {
      await this.creatP(P);
      this.$router.push("/");
    },
  },
};
</script>

