import { projects, users, db } from "../firebase.js";
import lo from "lodash";
import { v4 as uuidv4 } from "uuid";

function calcNewWidth(T) {
  if (T) {
    var total = 0;
    var ftot = 0;
    for (const key in T) {
      total += lo.toNumber(T[key].duration);
      if (T[key].finished) ftot += lo.toNumber(T[key].duration);
    }
    var w = ((ftot / total) * 100).toFixed(2);
    return "width: " + w + "%";
  } else return null;
}

export default {
  async newStoreInit({ state }, id) {
    // check if first init == projects[].length is 0
    // var flag = state.projects.length;
    var user = db.ref().child("users/" + id);
    var ps = null;
    await user.once("value", (ds) => {
      ps = ds.val()?.projects;
    });
    if (ps) {
      for (const key in ps) {
        projects.child(key).on("value", (ds) => {
          var dsV = ds.val();
          if (state.projects.length == 0) {
            var newP = {
              id: ds.key,
              name: dsV.name,
              desc: dsV.desc,
              completion: dsV.completion,
              tasks: dsV.tasks,
              owner: dsV.owner,
            };
            state.projects.push(newP);
          } else {
            for (let i = 0; i < state.projects.length; i++) {
              if (state.projects[i].id == ds.key) {
                state.projects[i].completion = dsV.completion;
                state.projects[i].tasks = dsV.tasks;

              }
            }
          }
        });
        // projects.child(key).on("child_changed", (ds) => {
        //   for (let i = 0; i < state.projects.length; i++) {
        //     if (state.projects[i].id == ds.key) {
        //       console.log(ds.val());
        //     }
        //   }
        // });
      }
    }
  },
  async onChildChanged(_, ds) {
    console.log(ds.val());
  },
  storeInit({ state }, id) {
    console.log("in store Init");
    var userProjects = projects.orderByChild("owner").equalTo(id);

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
    state.sharedProjects = [];
  },
  async newCreateP({ rootGetters, dispatch }, P) {
    // console.log(P);
    var uid = rootGetters["user/getUID"];
    // var newp = projects.child(uid);
    var newp = await projects.push();
    await newp.set({
      ...P.project,
      owner: uid,
    });
    // var pid = newp.key;
    await users
      .child(uid + "/projects")
      .child(newp.key)
      .set(true);

    await dispatch("newStoreInit", uid);
  },
  async newPatchP(_, payload) {
    // var uid = rootGetters["user/getUID"];
    var p = projects.child(payload.id);
    await p.update(payload.changes);

    // console.log(payload.id);
  },
  async newDeleteP({ state, rootGetters }, id) {
    var uid = rootGetters["user/getUID"];
    state.loading = true;
    var p = projects.child(id);
    await p
      .remove()
      .then(function() {
        // console.log("Remove succeeded.");
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message);
      });
    await users
      .child(uid + "/projects")
      .child(id)
      .remove()
      .then(async () => {
        // await dispatch("newStoreInit",uid);
        state.loading = false;
      });

    state.projects = state.projects.filter((p) => p.id !== id);
  },
  async shareProject(_, payload) {
    var u = users.orderByChild("email").equalTo(payload.email);
    u.once("value", async (ds) => {
      var p = projects.child(payload.id + "/team/" + Object.keys(ds.val())[0]);
      await p.set(true);
      await users
        .child(Object.keys(ds.val())[0] + "/projects/" + payload.id)
        .set(true);
      // console.log(Object.keys(ds.val())[0]);
    });
  },
  async addTask({ state, dispatch }, payload) {
    // var uid = rootGetters["user/getUID"];
    var next = uuidv4();
    var p = projects.child(payload.id + "/tasks/" + next);
    await p.set(payload.task);
    for (let i = 0; i < state.projects.length; i++) {
      if (state.projects[i].id == payload.id) {
        state.projects[i].tasks[next] = payload.task;

        let newW = lo.isEmpty(state.projects[i].tasks)
          ? "width: 0%"
          : calcNewWidth(state.projects[i].tasks);

        state.projects[i].completion = newW;
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

    for (let i = 0; i < state.projects.length; i++) {
      if (state.projects[i].id == payload.projectId) {
        let tmpt = {};
        for (const key in state.projects[i].tasks) {
          if (key !== payload.id) {
            tmpt[key] = state.projects[i].tasks[key];
          }
        }

        let newW = lo.isEmpty(tmpt) ? "width: 0%" : calcNewWidth(tmpt);

        state.projects[i].tasks = tmpt;
        state.projects[i].completion = newW;
        changes = {
          tasks: tmpt,
          completion: newW,
        };
      }
    }

    await dispatch("newPatchP", {
      id: payload.projectId,
      changes,
    });
  },
  async finishedTask({ dispatch, state }, payload) {
    //   console.log('at finished action');
    for (let i = 0; i < state.projects.length; i++) {
      if (state.projects[i].id == payload.projectId) {
        for (const key in state.projects[i].tasks) {
          if (key == payload.id) {
            state.projects[i].tasks[key].finished = !state.projects[i].tasks[
              key
            ].finished;
          }
        }
        var newW = calcNewWidth(state.projects[i].tasks);

        state.projects[i].completion = newW;

        var changes = {
          tasks: state.projects[i].tasks,
          completion: newW,
        };

        var id = payload.projectId;

        await dispatch("newPatchP", {
          id,
          changes,
        });
      }
    }
  },
};
