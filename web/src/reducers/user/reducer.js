import { 
	SET_USER_ROUTE
} from './constant';

const initialState = {
	userRoute:[]
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_USER_ROUTE:
			return {
				...state,
				userRoute: payload.userRoute,
			};
		default:
			return state;
	}
};
