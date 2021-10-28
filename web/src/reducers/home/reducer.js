import { 
	SET_NOTICE_INFO
} from './constant';

const initialState = {
	noticeInfo:[{
		create_time:"2021-10-28 15:52:56",
		content:"这是我的博客小屋，欢迎参观啊",
		author:"管理员",
		sort:0,
	}]
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_NOTICE_INFO:
			return {
				...state,
				noticeInfo: payload.noticeInfo,
			};
		default:
			return state;
	}
};
