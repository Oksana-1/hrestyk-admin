import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: '#FF5252',
				error: '#F44336',
				warning: '#ff9800',
				info: '#607d8b',
				success: '#8bc34a'
			}
		},
	},
});
