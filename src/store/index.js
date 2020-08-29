import {getProducts, getProduct} from "../api";

const state = {
    drawer: null,
    dialog: false,
    products: null,
    product: null
};
const getters = {
    drawer: state => state.drawer,
    dialog: state => state.dialog,
    products: state => state.products,
    product: state => state.product,
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
    },
    SET_PRODUCT (state, payload) {
        state.product = payload;
    }
};
const actions = {
    async fetchProducts ({commit}) {
        const products = await getProducts();
        commit('SET_PRODUCTS', products);
    },
    async getSingleProduct({commit}, productId) {
        const product = await getProduct(productId);
        commit('SET_PRODUCT', product);
    }
};
export default {
    state,
    getters,
    mutations,
    actions
}