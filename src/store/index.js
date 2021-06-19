import { ProductApi, OrderApi } from "@/api";

const productApi = new ProductApi();
const orderApi = new OrderApi();

const state = {
  drawer: null,
  dialog: false,
  products: null,
  categories: null,
  product: null,
  newProduct: null,
  loading: false,
  orders: null,
  count: null,
};
const getters = {
  drawer: (state) => state.drawer,
  dialog: (state) => state.dialog,
  products: (state) => state.products,
  categories: (state) => state.categories,
  product: (state) => state.product,
  newProduct: (state) => state.newProduct,
  loading: (state) => state.loading,
  orders: (state) => state.orders,
  count: (state) => state.count,
};
const mutations = {
  SET_DRAWER(state, payload) {
    state.drawer = payload;
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
  SET_ORDERS(state, payload) {
    state.orders = payload;
  },
  SET_COUNT(state, payload) {
    state.count = payload;
  },
};
const actions = {
  async fetchProducts({ commit }) {
    commit("SET_LOADING", true);
    try {
      const response = await productApi.getProducts();
      commit("SET_PRODUCTS", response.products);
      commit("SET_CATEGORIES", response.categories);
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      commit("SET_LOADING", false);
    }
  },
  async getSingleProduct({ commit }, productId) {
    commit("SET_LOADING", true);
    try {
      const response = await productApi.getProduct(productId);
      commit("SET_PRODUCT", response.product);
      commit("SET_CATEGORIES", response.categories);
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      commit("SET_LOADING", false);
    }
  },
  async postNewProduct({ commit }, payload) {
    try {
      await productApi.createProduct(payload);
      commit("SET_NEW_PRODUCT", {});
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  async deleteProduct({ commit }, productId) {
    commit("SET_LOADING", true);
    try {
      await productApi.deleteProduct(productId);
      const response = await productApi.getProducts();
      commit("SET_PRODUCTS", response.products);
      commit("SET_CATEGORIES", response.categories);
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      commit("SET_LOADING", false);
    }
  },
  async addImage({ commit }, { productId, payload }) {
    commit("SET_LOADING", true);
    try {
      const response = await productApi.addImage(productId, payload);
      commit("SET_PRODUCT", response);
      return response;
    } catch (e) {
      console.error(e);
    } finally {
      commit("SET_LOADING", false);
    }
  },
  async deleteImage({ commit }, imageId) {
    try {
      const response = await productApi.deleteImage(imageId);
      commit("SET_PRODUCT", response.product);
      commit("SET_CATEGORIES", response.categories);
      return response;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  async editProduct({ commit }, { productId, payload }) {
    commit("SET_LOADING", true);
    try {
      const response = await productApi.editProduct({ productId, payload });
      commit("SET_PRODUCT", response.product);
      commit("SET_CATEGORIES", response.categories);
      return response;
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      commit("SET_LOADING", false);
    }
  },
  async getOrders({ commit }, { take, skip }) {
    commit("SET_LOADING", true);
    try {
      const response = await orderApi.getOrders({ take, skip });
      commit("SET_ORDERS", response.orders);
      commit("SET_COUNT", response.count);
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      commit("SET_LOADING", false);
    }
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
