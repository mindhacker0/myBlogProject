import action from '../action-method';
//常量
export const GET_USER_ROUTE =  Symbol('GET_USER_ROUTE');
export const SET_USER_ROUTE =  Symbol('SET_USER_ROUTE');
export const USER_LOGIN =  Symbol('USER_LOGIN');
export const SET_USER_LOGIN =  Symbol('SET_USER_LOGIN');
export const GET_USER_INFO =  Symbol('GET_USER_INFO');
export const SET_USER_INFO =  Symbol('SET_USER_INFO');
//方法
export const getUserRoute = action(GET_USER_ROUTE);
export const setUserRoute = action(SET_USER_ROUTE);
export const userLogin = action(USER_LOGIN);
export const setUserLogin = action(SET_USER_LOGIN);
export const getUserInfo = action(GET_USER_INFO);
export const setUserInfo = action(SET_USER_INFO);
