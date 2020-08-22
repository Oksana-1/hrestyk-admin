import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import vuetify from './plugins/vuetify';
import adminStore from './store';

Vue.use(Vuex);
const store = new Vuex.Store(adminStore);

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
