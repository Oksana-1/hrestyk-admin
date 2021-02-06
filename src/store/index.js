import * as api from "../api";

const state = {
	drawer: null,
	dialog: false,
	products: null,
	categories: null,
	product: null,
	newProduct: null,
	loading: false
};
const getters = {
	drawer: state => state.drawer,
	dialog: state => state.dialog,
	products: state => state.products,
	categories: state => state.categories,
	product: state => state.product,
	newProduct: state => state.newProduct,
	loading: state => state.loading,
}
const mutations = {
	SET_DRAWER(state, payload) {
		state.drawer = payload
	},
	SET_DIALOG(state, payload) {
		state.dialog = payload;
	},
	SET_PRODUCTS(state, payload) {
		state.products = payload;
	},
	SET_CATEGORIES(state, payload) {
		state.categories = payload;
	},
	SET_PRODUCT(state, payload) {
		state.product = payload;
	},
	SET_NEW_PRODUCT(state, payload) {
		state.newProduct = payload;
	},
	SET_LOADING(state, payload) {
		state.loading = payload;
	},
};
const actions = {
	async fetchProducts({commit}) {
		commit('SET_LOADING', true);
		const response = await api.getProducts();
		commit('SET_PRODUCTS', response.products);
		commit('SET_CATEGORIES', response.categories);
		commit('SET_LOADING', false);
	},
	async getSingleProduct({commit}, productId) {
		commit('SET_LOADING', true);
		const response = await api.getProduct(productId);
		commit('SET_PRODUCT', response.product);
		commit('SET_CATEGORIES', response.categories);
		commit('SET_LOADING', false);
	},
	async postNewProduct({commit}, payload) {
		await api.createProduct(payload);
		commit('SET_NEW_PRODUCT', {});
	},
	async deleteProduct({commit}, productId) {
		commit('SET_LOADING', true);
		await api.deleteProduct(productId);
		const response = await api.getProducts();
		commit('SET_PRODUCTS', response.products);
		commit('SET_CATEGORIES', response.categories);
		commit('SET_LOADING', false);
	},
	async editProduct({commit}, {productId, payload}) {
		commit('SET_LOADING', true);
		await api.editProduct({productId, payload});
		const response = await api.getProduct(productId);
		commit('SET_PRODUCT', response.product);
		commit('SET_CATEGORIES', response.categories);
		commit('SET_LOADING', false);
	}
};
export default {
	state,
	getters,
	mutations,
	actions
}