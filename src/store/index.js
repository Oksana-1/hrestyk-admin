import {getProducts} from "../api";

const state = {
    drawer: null,
    dialog: false,
    products: null
};
const getters = {
    drawer: state => state.drawer,
    dialog: state => state.dialog,
    products: state => state.products

}
const mutations = {
    SET_DRAWER (state, payload) {
        state.drawer = payload
    },
    SET_DIALOG (state, payload) {
        state.dialog = payload;
    },
    SET_PRODUCTS (state, payload) {
        state.products = payload;
    }
};
const actions = {
    async fetchProducts ({commit}) {
        const products = await getProducts();
        commit('SET_PRODUCTS', products);
    }
};
export default {
    state,
    getters,
    mutations,
    actions
}