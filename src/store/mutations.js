export default {
  setProjects(state, Ps) {
    state.projects = Ps;
    state.projectsCount = Ps.length;
  },
  setLoading(state, L) {
    state.loading = L;
  },
  setLoadingError(state, err) {
    state.err = err;
  },

  
};
