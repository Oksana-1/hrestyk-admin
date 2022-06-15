import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import vuetify from "./plugins/vuetify";

import App from "./App.vue";
import adminStore from "./store";
import routes from "./routes";

import { dateToString, roundSum } from "./filters";

Vue.filter("dateToString", dateToString);
Vue.filter("roundSum", roundSum);

Vue.use(Vuex);
Vue.use(VueRouter);

const store = new Vuex.Store(adminStore);
const router = new VueRouter({
  routes,
  mode: "hash",
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
