import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import vuetify from './plugins/vuetify';
import adminStore from './store';
import VueRouter from "vue-router";
import routes from './routes'
Vue.use(Vuex);
Vue.use(VueRouter);
const store = new Vuex.Store(adminStore);
const router = new VueRouter({
  routes,
  mode: 'history'
})
Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
