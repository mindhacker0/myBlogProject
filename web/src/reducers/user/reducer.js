import { 
	SET_USER_ROUTE,
	SET_USER_LOGIN,
	SET_USER_INFO
} from './constant';

const initialState = {
	isLogin:false,
	userInfo:{},
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
		case SET_USER_INFO:
			return {
				...state,
				userInfo: payload.userInfo,
			};
		default:
			return state;
	}
};
