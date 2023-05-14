import { ProductApi } from "@/api/ProductApi";
import withJwt from "@/api/jwt/withJwt";

const productApi = new ProductApi();

const state = {
  products: null,
  categories: null,
  product: null,
  loading: false,
  editing: false,
};
const getters = {
  products: (state) => state.products,
  categories: (state) => state.categories,
  product: (state) => state.product,
  loading: (state) => state.loading,
  editing: (state) => state.editing,
};
const mutations = {
  SET_PRODUCTS(state, payload) {
    state.products = payload;
  },
  SET_CATEGORIES(state, payload) {
    state.categories = payload;
  },
  SET_PRODUCT(state, payload) {
    state.product = payload;
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
  SET_EDITING(state, payload) {
    state.editing = payload;
  },
};
const actions = {
  async fetchProducts({ commit }) {
    commit("SET_LOADING", true);
    const response = await withJwt(productApi.getProducts)();
    commit("SET_PRODUCTS", response.products);
    commit("SET_CATEGORIES", response.categories);
    commit("SET_LOADING", false);
  },
  async getSingleProduct({ commit }, productId) {
    commit("SET_LOADING", true);
    const response = await withJwt(productApi.getProduct)(productId);
    commit("SET_PRODUCT", response.product);
    commit("SET_CATEGORIES", response.categories);
    commit("SET_LOADING", false);
  },
  async postNewProduct(_, payload) {
    await withJwt(productApi.createProduct)(payload);
  },
  async deleteProduct({ commit, dispatch }, productId) {
    commit("SET_LOADING", true);
    await withJwt(productApi.deleteProduct)(productId);
    dispatch("fetchProducts");
    commit("SET_LOADING", false);
  },
  async addImage({ commit }, { productId, payload }) {
    commit("SET_EDITING", true);
    const response = await withJwt(productApi.addImage)({
      productId,
      payload,
    });
    commit("SET_PRODUCT", response);
    commit("SET_EDITING", false);
    return response;
  },
  async deleteImage({ commit }, imageId) {
    commit("SET_EDITING", true);
    const response = await withJwt(productApi.deleteImage)(imageId);
    commit("SET_PRODUCT", response.product);
    commit("SET_CATEGORIES", response.categories);
    commit("SET_EDITING", false);
    return response;
  },
  async editProduct({ commit }, { productId, payload }) {
    commit("SET_EDITING", true);
    const response = await withJwt(productApi.editProduct)({
      productId,
      payload,
    });
    commit("SET_PRODUCT", response.product);
    commit("SET_CATEGORIES", response.categories);
    commit("SET_EDITING", false);
    return response;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
