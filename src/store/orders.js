import { OrderApi } from "@/api";

const orderApi = new OrderApi();

const state = {
  orders: null,
  order: null,
  count: null,
  loading: false,
};
const getters = {
  orders: (state) => state.orders,
  order: (state) => state.order,
  count: (state) => state.count,
  loading: (state) => state.loading,
};
const mutations = {
  SET_ORDERS(state, payload) {
    state.orders = payload;
  },
  SET_ORDER(state, payload) {
    state.order = payload;
  },
  SET_COUNT(state, payload) {
    state.count = payload;
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
};
const actions = {
  async fetchOrders({ commit }, { take, skip }) {
    try {
      const response = await orderApi.getOrders({ take, skip });
      commit("SET_ORDERS", response.orders);
      commit("SET_COUNT", response.count);
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  async getOrderById({ commit }, orderId) {
    commit("SET_LOADING", true);
    try {
      const response = await orderApi.getOrder(orderId);
      commit("SET_ORDER", response);
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      commit("SET_LOADING", false);
    }
  },
  async changeOrderStatus({ commit }, { id, status, content }) {
    commit("SET_LOADING", true);
    const response = await orderApi.orderProcessing({ id, status, content });
    commit("SET_ORDER", response);
    commit("SET_LOADING", false);
  },
  async deleteOrderById({ dispatch }, id) {
    await orderApi.deleteOrder(id);
    await dispatch("fetchOrders");
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
