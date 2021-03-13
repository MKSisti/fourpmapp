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



function pushProject(ds, projects) {

  // console.log("got called");
  var dsV = ds.val();
  var newP = {
    id: ds.key,
    name: dsV.name,
    desc: dsV.desc,
    completion: dsV.completion,
    tasks: dsV.tasks,
    owner: dsV.owner,
  };
  projects.push(newP);
}
function updateProject(ds, project) {
  let v = ds.val();
  project.completion = v.completion;
  project.tasks = v.tasks;
}

export default {
  createListenerOnProjectValue({state},id) {
    projects.child(id).on('value',(ds)=>{
      console.log(ds.val());
      if (ds.val()) {
        const idx = state.projects.findIndex((p) => p.id == ds.key);
        // ds is not null == create or update
        if (idx < 0 ) {
          // idx < 0 == project is not in the store => create
           pushProject(ds, state.projects);
        }
        else {
          // idx >= 0 == project exists in store => update
           updateProject(ds,state.projects[idx]);
        }
      }
      else{
        //ds is null == delete event
        console.log("deleted");
        
      }
    })
  },
  async newStoreInit({state, dispatch }, id) {
    var user = db.ref().child("users/" + id);
    var ps = null;
    await user.once("value", (ds) => {
      ps = ds.val()?.projects;
    });
    if (ps) {
      for (const key in ps) {
        dispatch("createListenerOnProjectValue",key);
      }
    }
    user.on("child_removed", async (ds) => {
      // console.log(ds.val());
      for (const key in ds.val()) {
        console.log(key);
        const idx = state.projects.findIndex((p) => p.id == key);
        console.log(idx);
        if (idx >= 0) {
          state.projects = state.projects.filter((p) => p.id !== key);
        }
      }
      // await dispatch("newStoreInit", id);
    });
  },
  clearStore({ state }) {
    state.projects = [];
    // state.sharedProjects = [];
  },
  async newCreateP({ dispatch ,rootGetters }, P) {
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
      dispatch("createListenerOnProjectValue",newp.key);
    // await dispatch("newStoreInit", uid);
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
    var team = (await p.child('team').get()).val();
    // console.log(team);
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
        state.projects = state.projects.filter((p) => p.id !== id);
        state.loading = false;

      });
    for (const key in team) {
      await users
      .child(key + "/projects")
      .child(id)
      .remove()
      .then(async () => {
        // await dispatch("newStoreInit",uid);
        
      });
    }
    p.off();
    
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
