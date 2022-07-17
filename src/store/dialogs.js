const state = {
  drawer: null,
  dialog: false,
};
const getters = {
  drawer: (state) => state.drawer,
  dialog: (state) => state.dialog,
};
const mutations = {
  SET_DRAWER(state, payload) {
    state.drawer = payload;
  },
  SET_DIALOG(state, payload) {
    state.dialog = payload;
  },
};
const actions = {};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
