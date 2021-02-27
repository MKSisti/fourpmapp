export default {
  getProjects(state) {
    return state.projects;
  },
  getSharedProjects(state) {
    return state.sharedProjects;
  },
  getProjectsCount(state) {
    return state.projectsCount;
  },
  getLoading(state) {
    return state.loading;
  },
  getLoadingErr(state) {
    return state.err;
  },
  getProject: (state) => (id) => {
    return state.projects.find(project => project.id === id)
  }
};
