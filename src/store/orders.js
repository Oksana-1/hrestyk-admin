import { OrderApi } from "@/api/OrderApi";
import withJwt from "@/api/jwt/withJwt";

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
    const response = await withJwt(orderApi.getOrders)({ take, skip });
    commit("SET_ORDERS", response.orders);
    commit("SET_COUNT", response.count);
  },
  async getOrderById({ commit }, orderId) {
    commit("SET_LOADING", true);
    const response = await withJwt(orderApi.getOrder)(orderId);
    commit("SET_ORDER", response);
    commit("SET_LOADING", false);
  },
  async changeOrderStatus({ commit }, { id, status, content }) {
    commit("SET_LOADING", true);
    const response = await withJwt(orderApi.orderProcessing)({
      id,
      status,
      content,
    });
    commit("SET_ORDER", response);
    commit("SET_LOADING", false);
  },
  async deleteOrderById(_, id) {
    await withJwt(orderApi.deleteOrder)(id);
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
