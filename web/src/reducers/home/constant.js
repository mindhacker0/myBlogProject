import action from '../action-method';
//常量
export const GET_NOTICE_INFO =  Symbol('GET_NOTICE_INFO');
export const SET_NOTICE_INFO =  Symbol('SET_NOTICE_INFO');
//方法
export const getNoticeInfo = action(GET_NOTICE_INFO);
export const setNoticeInfo = action(SET_NOTICE_INFO);
