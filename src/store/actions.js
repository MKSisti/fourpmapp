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
  return "width: " + w + "%";
}

export default {
  // async storeInit({ state }) {
  //   await projects.once("value", function(ds) {
  //     state.loading = true;
  //     state.projects = [];

  //     ds.forEach(function(p) {
  //       state.projects.push({
  //         id: p.key,
  //         name: p.val().name,
  //         desc: p.val().desc,
  //         completion: p.val().completion,
  //         tasks: p.val().tasks,
  //       });
  //     });
  //     state.loading = false;
  //   });
  // },
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
  async addTask(_,payload){
    var p = projects.child(payload.id+'/tasks');
    p.push(payload.task)
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
