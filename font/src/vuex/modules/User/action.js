export const userActions = {
	setUser({commit}, user) {
		commit('SETUSER', user);
	},
	removeUser({commit}) {
		commit('REMOVEUSER');
	},
  setCount({commit}, count) {
	  commit('SETCOUNT', count);
  }
};
