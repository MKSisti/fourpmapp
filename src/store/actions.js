// import axios from "axios";
import { projects } from "../firebase.js";

function calcNewWidth(T) {
  var total = 0;
  var ftot = 0;
  for (let idx = 0; idx < T.length; idx++) {
    total += Number(T[idx].duration);
    if (T[idx].finished == true) {
      ftot += Number(T[idx].duration);
    }
  }

  var w = ((ftot / total) * 100).toFixed(2);
  return " width: " + w + "%";
}

export default {
  async newCreateP(_, P) {
    await projects.push(P);
  },
  async newPatchP(_, payload) {
    var p = projects.child(payload.id);
    await p.update(payload.changes);
    // console.log(payload.id);
  },
  async newDeleteP(_, id) {
    var p = projects.child(id);
    await p
      .remove()
      .then(function() {
        // console.log("Remove succeeded.");
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message);
      });
  },
  async deleteTask({ dispatch, state }, payload) {
    var changes = {};
    var id = payload.projectId;

    for (let i = 0; i < state.projects.length; i++) {
      if (state.projects[i].id == id) {
        let tmpt = state.projects[i].tasks.filter(
          (task) => task.name !== payload.taskName
        );
        let newW = tmpt.length>0? calcNewWidth(tmpt) : '0';

        state.projects[i].tasks = tmpt;
        state.projects[i].completion = newW;
        changes = {
          tasks: tmpt,
          completion: newW,
        };
      }
    }

    await dispatch("newPatchP", {
      id,
      changes,
    });
  },
  async finishedTask({ dispatch, state }, payload) {
    //   console.log('at finished action');
    for (let i = 0; i < state.projects.length; i++) {
      if (state.projects[i].id == payload.projectId) {
        for (let j = 0; j < state.projects[i].tasks.length; j++) {
          if (state.projects[i].tasks[j].name == payload.taskName) {
            state.projects[i].tasks[j].finished = !state.projects[i].tasks[j]
              .finished;
          }
        }
        var newW = calcNewWidth(state.projects[i].tasks);

        state.projects[i].completion = newW;

        var changes = {
          tasks: state.projects[i].tasks,
          completion: newW,
        };
        // console.log("new width is ");
        // console.log(newW);
        var id = payload.projectId;

        await dispatch("newPatchP", {
          id,
          changes,
        });
      }
    }
  },
  // async createP(_, P) {
  //   try {
  //     await axios.post(
  //       "https://vue-test-6edc5.firebaseio.com/projects.json",
  //       P,
  //       { timeout: 8000 }
  //     );
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // },
  // async patchP(_, payload) {
  //   try {
  //     await axios.patch(
  //       "https://vue-test-6edc5.firebaseio.com/projects/" +
  //         payload.id +
  //         ".json",
  //       payload.changes,
  //       { timeout: 8000 }
  //     );
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // },

  // async deleteP(_, id) {
  //   try {
  //     await axios.delete(
  //       "https://vue-test-6edc5.firebaseio.com/projects/" + id + ".json",
  //       { timeout: 8000 }
  //     );
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // },
  // async getAll({ commit }) {
  //   try {
  //     commit("setLoadingError", false);
  //     commit("setLoading", true);

  //     const all = await axios(
  //       "https://vue-test-6edc5.firebaseio.com/projects.json",
  //       { timeout: 8000 }
  //     );
  //     let tmp = [];
  //     for (const id in all.data) {
  //       tmp.push({
  //         id: id,
  //         name: all.data[id].name,
  //         desc: all.data[id].desc,
  //         completion: all.data[id].completion,
  //         tasks: all.data[id].tasks,
  //       });
  //     }
  //     commit("setProjects", tmp);
  //     commit("setLoading", false);
  //   } catch (error) {
  //     console.error(error.message);
  //     commit("setLoading", false);
  //     commit("setLoadingError", true);
  //   }
  // },
  // async getOne({ commit }, id) {
  //   try {
  //     commit("setLoadingError", false);
  //     commit("setLoading", true);
  //     const One = await axios(
  //       "https://vue-test-6edc5.firebaseio.com/projects/" + id + ".json",
  //       { timeout: 3000 }
  //     );
  //     commit("setLoading", false);
  //     return One;
  //   } catch (error) {
  //     commit("setLoading", false);
  //     commit("setLoadingError", true);
  //   }
  // },
};
