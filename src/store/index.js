import { createStore } from "vuex";
import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";
// import projects from '../firebase.js'

const store = createStore({
  state() {
    return {
      projects: [],
      projectsCount: 0,
      loading: true,
      err: false,
    };
  },
  mutations: mutations,
  actions: actions,
  getters: getters,
});


export default store;
