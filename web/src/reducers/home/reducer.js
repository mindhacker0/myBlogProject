import { 
	SET_GAME_TABLE
} from './constant';

const initialState = {
	gameTable:[]
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_GAME_TABLE:
			return {
				...state,
				gameTable: payload.gameTable,
			};
		default:
			return state;
	}
};
