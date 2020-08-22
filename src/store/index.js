const state = {
    drawer: null,
};
const getters = {
    drawer: state => state.drawer
}
const mutations = {
    SET_DRAWER (state, payload) {
        state.drawer = payload
    },
};
const actions = {

};
export default {
    state,
    getters,
    mutations,
    actions
}