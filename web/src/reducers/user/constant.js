import action from '../action-method';
//常量
export const GET_USER_ROUTE =  Symbol('GET_USER_ROUTE');
export const SET_USER_ROUTE =  Symbol('SET_USER_ROUTE');
//方法
export const getUserRoute = action(GET_USER_ROUTE);
export const setUserRoute = action(SET_USER_ROUTE);
