<template>
  <base-card>
    <new-project @add-project="addProject"></new-project>
  </base-card>
</template>

<script>
import NewProject from "../components/NewProject.vue";
import { mapGetters } from "vuex";
// import axios from "axios";

export default {
  components: { NewProject },
  methods: {
    async addProject(P) {
      // await this.creatP(P);
      // console.log(this.info);
      var payload = {
        project: P,
        uid: this.info.id,
      };
      await this.$store.dispatch("newCreateP", payload);
      // await this.$store.dispatch("getAll");
      this.$router.push("/");
    },
  },
  computed: {
    ...mapGetters({
      info: "user/getUserInfo",
    }),
  },
};
</script>

