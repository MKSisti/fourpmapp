import { createStore } from "vuex";
import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";
import user from "./modules/user/index.js";
// import {projects} from '../firebase.js'

const store = createStore({
  state() {
    return {
      projects: [],
      sharedProjects: [],
      // projectsCount: 0,
      loading: true,
      err: false,
    };
  },
  mutations: mutations,
  actions: actions,
  getters: getters,
  modules: {
    user,
  },
});

// init the store from firebase
// projects.on("value", function(ds) {
//   store.state.loading = true;
//   store.state.projects = [];

//   ds.forEach(function(p) {
//     store.state.projects.push({
//       id: p.key,
//       name: p.val().name,
//       desc: p.val().desc,
//       completion: p.val().completion,
//       tasks: p.val().tasks,
//     });
//   });
//   store.state.loading = false;
// },function (error) {
//   console.log(error);
// });

// update the store whenever a new project is added
// projects.on("child_added", function(ds) {
//   store.state.projects.push({
//     id: ds.key,
//     name: ds.val().name,
//     desc: ds.val().desc,
//     completion: ds.val().completion,
//     tasks: ds.val().tasks,
//   });
//   console.log('child added');
// });

// // update the store whenever a project gets deleted
// projects.on('child_removed',function (ds) {
//   store.state.projects.filter()
// })

export default store;
