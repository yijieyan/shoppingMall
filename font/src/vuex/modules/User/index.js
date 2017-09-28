import {userActions}  from './action';
import {userGetters}  from './getter';
import {userMutation} from './mutation';


export const user = {
	state: {
    info : {},
    count: 0
	},
	actions: userActions,
	getters: userGetters,
	mutations: userMutation
};

export default user;
