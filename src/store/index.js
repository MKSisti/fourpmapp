import { createStore } from "vuex";
import mutations from "./mutations.js";
import actions from "./actions.js";

const store = createStore({
  state() {
    return {
      projects: [],
      projectsCount: 0,
      loading: false,
      err: false,
    };
  },
  mutations: mutations,
  actions: actions,
  getters: {
    getProjects(state) {
      return state.projects;
    },
    getProjectsCount(state) {
      return state.projectsCount;
    },
    getLoading(state) {
      return state.loading;
    },
    getLoadingErr(state) {
      return state.err;
    },
    
  },
});

export default store;
