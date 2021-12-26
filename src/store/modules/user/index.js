import { auth, users } from "../../../firebase";
//

export default {
  namespaced: true,
  state() {
    return {
      userInfo: {},
      isLoggedIn: false,
      emailVerification: true,
    };
  },
  mutations: {
    setUser(state, u) {
      // console.log("from set user");
      state.isLoggedIn = true;
      //   console.log(u.uid);
      state.userInfo = {
        name: u.displayName,
        picture: u.photoURL,
        email: u.email,
        id: u.uid,
      };
    },
    setUserOut(state) {
      //   console.log("from out mutation");
      state.isLoggedIn = false;
      state.userInfo = {};
      state.emailVerification = true;
    },
    setEmailVerification(state, payload) {
      state.emailVerification = payload.value;
    }
  },
  actions: {
    async setupUser({ commit, dispatch }, payload) {
      // console.log(payload);
      await users.child(payload.uid).once(
        "value",
        (ds) => {
          // all good
          if (ds.exists()) {
            // user exists
          } else {
            // user is yet to be added
            // console.log("ds is null");
            var newU = users.child(payload.uid);
            newU.set({
              email: payload.email,
              projects: [],
            });
          }
          commit({
            type: "setUser",
            ...payload,
          });
          dispatch("newStoreInit", payload.uid, { root: true });
        },
        (err) => {
          // some error
          console.log(err);
        }
      );
    },
    async logOut() {
      // console.log("from out");
      try {
        await auth.signOut();
      } catch (error) {
        console.log(error);
      }
    },
    async SignUser({ commit }, payload) {
      await auth.createUserWithEmailAndPassword(payload.email, payload.password).then((U) => {
        console.log(payload.displayName);
        U.user.updateProfile({ displayName: payload.displayName });
        U.user.sendEmailVerification();
        commit({
          type: "setEmailVerification",
          value: U.emailVerified,
        })
      }).catch((error) => {
        console.error(error);
      })

    },
    async LogInUser({ commit }, payload) {
      await auth.signInWithEmailAndPassword(payload.email, payload.password).then((U) => {
        commit({
          type: "setEmailVerification",
          value: U.emailVerified,
        })
      }).catch((error) => {
        console.error(error);
      });

    },
    async SendReset(_, payload) {
      await auth.sendPasswordResetEmail(payload.email, { url: "/handleReset" }).catch((error) => { console.error(error); });
    },
    async ResetPwd(_, payload) {
      console.log(payload.email);
    }
  },
  getters: {
    getUserInfo({ userInfo }) {
      return userInfo;
    },
    getloggedState({ isLoggedIn }) {
      return isLoggedIn;
    },
    getUID({ userInfo }) {
      if (userInfo.id) {
        return userInfo.id;
      } else return null;
    },
    getEmailVerification({ emailVerification }) {
      return emailVerification;
    },
  },
};
