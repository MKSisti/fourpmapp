<template>
  <div>
    <base-card>
      <div v-if="uid">
        <h1 class="text-center text-lighter text-3xl font-bold mb-12 uppercase">
          Projects List
        </h1>
        <div
          class="text-center uppercase text-xl font-medium text-lighter"
          v-if="err"
        >
          <base-icon
            name="error"
            h="1.5rem"
            w="1.5rem"
            class="inline-block mr-4 mb-2 animate-bounce fill-current text-burntSienna"
          />
          <span>ERROR while Loading Projects!!</span>
          <base-icon
            name="error"
            h="1.5rem"
            w="1.5rem"
            class="inline-block ml-4 mb-2 animate-bounce fill-current text-burntSienna"
          />
        </div>
        <div
          class="text-center uppercase text-xl font-medium text-lighter"
          v-else-if="loading"
        >
          <span class="text-xl">Loading Projects</span>
          <base-icon
            name="loading"
            h="1.5rem"
            w="1.5rem"
            class="inline-block ml-4 mb-2 animate-spin fill-current text-lighter"
          />
        </div>
        <div v-else-if="projects.length > 0">
          <projects-viewer
            v-for="project in projects"
            @delete-project="deleteProject"
            @delete-ptask="deleteTask"
            @finished-ptask="finishedTask"
            :key="project.id"
            :pid="project.id"
            :pname="project.name"
            :pdesc="project.desc"
            :ptasks="project.tasks ? project.tasks : null"
            :pcustomW="project.completion"
          ></projects-viewer>
        </div>

        <div
          class="text-center uppercase text-xl font-medium text-lighter"
          v-else
        >
          No items to show
        </div>
      </div>
    </base-card>
  </div>
</template>

<script>
import ProjectsViewer from "../components/ProjectsViewer.vue";
import { mapGetters } from "vuex";

// import axios from "axios";

export default {
  components: { ProjectsViewer },
  computed: {
    ...mapGetters({
      projects: "getProjects",
      loading: "getLoading",
      err: "getLoadingErr",
      uid: "user/getUID",
    }),
  },
  methods: {
    async deleteProject(id) {
      // console.log(id);
      await this.$store.dispatch("newDeleteP", id);
      // await this.$store.dispatch("getAll");
    },
    async deleteTask(id, projectId) {
      await this.$store.dispatch("deleteTask", {
        projectId,
        id,
      });
    },
    async finishedTask(id, projectId) {
      await this.$store.dispatch("finishedTask", {
        id,
        projectId,
      });
    },
  },
};
</script>