import Vue from 'vue';
import Vuex from 'vuex';
import User from './modules/User/index';
Vue.use(Vuex);

var state = {};

export default new  Vuex.Store({
	modules: {
		user: User
	},
	state
});
