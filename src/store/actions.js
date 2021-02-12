import { projects } from "../firebase.js";

function calcNewWidth(T) {
  if (T) {
    var total = 0;
    var ftot = 0;
    for (let idx = 0; idx < T.length; idx++) {
      total += Number(T[idx].duration);
      if (T[idx].finished == true) {
        ftot += Number(T[idx].duration);
      }
    }

    var w = ((ftot / total) * 100).toFixed(2);
    return "width: " + w + "%";
  } else return null;
}

export default {
  storeInit({ state }, id) {
    var userProjects = projects.child(id);
    userProjects.on("value", function(ds) {
      state.loading = true;
      state.projects = [];

      ds.forEach(function(p) {
        state.projects.push({
          id: p.key,
          name: p.val().name,
          desc: p.val().desc,
          completion: p.val().completion,
          tasks: p.val().tasks,
        });
      });
      state.loading = false;
    });
  },
  clearStore({ state }) {
    state.projects = [];
  },
  // async storeOnProjectAdded({ state }) {
  //   projects.on("child_added", function(ds) {
  //     // var id = ds.key
  //     state.projects.push({
  //       id: ds.key,
  //       name: ds.val().name,
  //       desc: ds.val().desc,
  //       completion: ds.val().completion,
  //       tasks: ds.val().tasks,
  //     });
  //   });
  // },
  async newCreateP({ rootGetters }, P) {
    // console.log(P);
    var uid = rootGetters["user/getUID"];
    var newp = projects.child(uid);
    await newp.push(P.project);
  },
  async newPatchP({ rootGetters }, payload) {
    var uid = rootGetters["user/getUID"];
    var p = projects.child(uid + "/" + payload.id);
    await p.update(payload.changes);
    // console.log(payload.id);
  },
  async newDeleteP({ rootGetters }, id) {
    var uid = rootGetters["user/getUID"];
    var p = projects.child(uid + "/" + id);
    await p
      .remove()
      .then(function() {
        // console.log("Remove succeeded.");
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message);
      });
  },
  async addTask({ rootGetters, state, dispatch }, payload) {
    var uid = rootGetters["user/getUID"];
    var p = projects.child(uid + "/" + payload.id + "/tasks/" + payload.next);
    await p.set(payload.task);
    for (let i = 0; i < state.projects.length; i++) {
      if (state.projects[i].id == payload.id) {
        var newW = calcNewWidth(state.projects[i].tasks);
        await dispatch("newPatchP", {
          id: payload.id,
          changes: {
            completion: newW,
          },
        });
      }
    }
  },
  async deleteTask({ dispatch, state }, payload) {
    var changes = {};
    var id = payload.projectId;

    for (let i = 0; i < state.projects.length; i++) {
      if (state.projects[i].id == id) {
        let tmpt = state.projects[i].tasks.filter(
          (task) => task.name !== payload.taskName
        );
        let newW = tmpt.length > 0 ? calcNewWidth(tmpt) : "width: 0%";

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
};
