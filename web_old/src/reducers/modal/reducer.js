import { 
	OPEN_MODAL,
	CLOSE_MODAL
} from './constant';

const initialState = {
	loginModal:false,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case OPEN_MODAL:
			return {
				...state,
				[payload.modalName]:true,
			};
		case CLOSE_MODAL:
			return {
				...state,
				[payload.modalName]:false,
			};
		default:
			return state;
	}
};
