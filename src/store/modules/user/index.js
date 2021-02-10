import { auth, provider } from "../../../firebase";

export default {
  namespaced: true,
  state() {
    return {
      userInfo: {},
      isLoggedIn: false,
    };
  },
  mutations: {
    setUser(state, u) {
    //   console.log("from set user");
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
    },
  },
  actions: {
    async logIn({ state }) {
      console.log("in login");
      if (state.isLoggedIn) {
        return;
      } else {
        try {
          await auth.signInWithPopup(provider);
        } catch (error) {
          console.log(error);
        }
      }
    },
    async logOut() {
      console.log("from out");
      try {
        await auth.signOut();
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    getUserInfo({ userInfo }) {
      return userInfo;
    },
    getloggedState({ isLoggedIn }) {
      return isLoggedIn;
    },
  },
};
