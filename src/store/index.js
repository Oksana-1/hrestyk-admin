import {getProducts, getProduct, createProduct} from "../api";

const state = {
    drawer: null,
    dialog: false,
    products: null,
    categories: null,
    product: null,
    newProduct: null,
};
const getters = {
    drawer: state => state.drawer,
    dialog: state => state.dialog,
    products: state => state.products,
    categories: state => state.categories,
    product: state => state.product,
    newProduct: state => state.newProduct,
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
    SET_CATEGORIES (state, payload) {
        state.categories = payload;
    },
    SET_PRODUCT (state, payload) {
        state.product = payload;
    },
    SET_NEW_PRODUCT (state, payload) {
        state.newProduct = payload;
    }
};
const actions = {
    async fetchProducts ({commit}) {
        const products = await getProducts();
        commit('SET_PRODUCTS', products);
    },
    async getSingleProduct({commit}, productId) {
        const response = await getProduct(productId);
        commit('SET_PRODUCT', response.product);
        commit('SET_CATEGORIES', response.categories);
    },
    async postNewProduct ({state}) {
        await createProduct(state.newProduct);
    }
};
export default {
    state,
    getters,
    mutations,
    actions
}