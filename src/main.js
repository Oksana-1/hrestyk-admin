import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import vuetify from "./plugins/vuetify";

import App from "./App.vue";
import products from "@/store/products";
import orders from "@/store/orders";
import dialogs from "@/store/dialogs";
import routes from "./routes";

import { dateToString, roundSum } from "./filters";

import JwtManager from "@/api/jwt/JwtManager";
const jwtManager = new JwtManager();

Vue.filter("dateToString", dateToString);
Vue.filter("roundSum", roundSum);

Vue.use(Vuex);
Vue.use(VueRouter);

const store = new Vuex.Store({
  modules: {
    products,
    orders,
    dialogs,
  },
});
const router = new VueRouter({
  routes,
  mode: "hash",
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = jwtManager.hasUserAccess;
  if (to.path !== "/login" && !isAuthenticated) next({ path: "/login" });
  else next();
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
