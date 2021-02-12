import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import vuetify from "./plugins/vuetify";
import PromisifyModals from './plugins/promisify-modal/';

import App from "./App.vue";
import adminStore from "./store";
import routes from "./routes";

import { dateToString } from "./filters";

Vue.filter("dateToString", dateToString);

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(PromisifyModals);

const store = new Vuex.Store(adminStore);
const router = new VueRouter({
  routes,
  mode: "history",
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
