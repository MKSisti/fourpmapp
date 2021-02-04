import axios from "axios";

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
  async createP(_, P) {
    try {
      await axios.post(
        "https://vue-test-6edc5.firebaseio.com/projects.json",
        P,
        { timeout: 8000 }
      );
    } catch (error) {
      console.error(error.message);
    }
  },
  async patchP(_, payload) {
    try {
      //   console.log("from patch, id :" + payload.id + " changes: ");
      //   console.log(payload.changes);
      await axios.patch(
        "https://vue-test-6edc5.firebaseio.com/projects/" +
          payload.id +
          ".json",
        payload.changes,
        { timeout: 8000 }
      );
    } catch (error) {
      console.error(error.message);
    }
  },
  async deleteP(_, id) {
    try {
      await axios.delete(
        "https://vue-test-6edc5.firebaseio.com/projects/" + id + ".json",
        { timeout: 8000 }
      );
    } catch (error) {
      console.error(error.message);
    }
  },
  async getAll({ commit }) {
    try {
      // state.err = false;
      // state.loading = true;
      commit("setLoadingError", false);
      commit("setLoading", true);

      const all = await axios(
        "https://vue-test-6edc5.firebaseio.com/projects.json",
        { timeout: 8000 }
      );
      let tmp = [];
      for (const id in all.data) {
        tmp.push({
          id: id,
          name: all.data[id].name,
          desc: all.data[id].desc,
          completion: all.data[id].completion,
          tasks: all.data[id].tasks,
        });
      }
      //   state.projects = tmp;
      //   state.loading = false;
      commit("setProjects", tmp);
      commit("setLoading", false);
      //   console.log(tmp);
    } catch (error) {
      console.error(error.message);
      //   state.err = true;
      //   state.loading = false;
      commit("setLoading", false);
      commit("setLoadingError", true);
    }
  },

  //   calcW2(_, T) {
  //     var total = 0;
  //     var ftot = 0;
  //     for (let idx = 0; idx < T.length; idx++) {
  //       total += Number(T[idx].duration);
  //       if (T[idx].finished == true) {
  //         ftot += Number(T[idx].duration);
  //       }
  //     }

  //     var w = ((ftot / total) * 100).toFixed(2);
  //     return " width: " + w + "%";
  //   },

  async deleteTask({ dispatch, state }, payload) {
    var changes = {};
    var id = payload.projectId;
    // console.log(payload);
    // for (const project in state.projects) {
    //   if (project.id == id) {
    //     let tmpt = project.tasks.filter(
    //       (task) => task.name !== payload.taskName
    //     );
    //     changes = {
    //       tasks: tmpt,
    //       completion: calcNewWidth(tmpt),
    //     };
    //   }
    // }

    for (let i = 0; i < state.projects.length; i++) {
      if (state.projects[i].id == id) {
        let tmpt = state.projects[i].tasks.filter(
          (task) => task.name !== payload.taskName
        );
        let newW = calcNewWidth(tmpt);

        state.projects[i].tasks = tmpt;
        state.projects[i].completion = newW;
        changes = {
          tasks: tmpt,
          completion: newW,
        };
      }
    }
    // console.log(changes);
    await dispatch("patchP", {
      id,
      changes,
    });
    // await dispatch("getAll");
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
        // var newW = this.calcW2(this.projects[i].tasks);
        var newW = calcNewWidth(state.projects[i].tasks);

        state.projects[i].completion = newW;

        var changes = {
          tasks: state.projects[i].tasks,
          completion: newW,
        };
        console.log("new width is ");
        console.log(newW);
        // console.log("changes are : ");
        // console.log(changes);
        var id = payload.projectId;

        // console.log("from finished Action, id: " + id + "changes: " + changes);
        await dispatch("patchP", {
          id,
          changes,
        });
      }
    }
  },
};
