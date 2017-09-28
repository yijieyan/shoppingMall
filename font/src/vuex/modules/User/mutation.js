export const userMutation = {
	['SETUSER'] (state, user) {
		state.info = user;
	},
	['REMOVEUSER'] (state) {
		state.info = {};
	},
  ['SETCOUNT'] (state, count) {
	  state.count = count
  }
};
