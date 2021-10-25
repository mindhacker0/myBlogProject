import { 
	SET_USER_ROUTE,
	SET_USER_LOGIN
} from './constant';

const initialState = {
	isLogin:false,
	userInfo:null,
	userRoute:[]
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_USER_ROUTE:
			return {
				...state,
				userRoute: payload.userRoute,
			};
		case SET_USER_LOGIN:
			return {
				...state,
				isLogin: payload.isLogin,
			};
		default:
			return state;
	}
};
