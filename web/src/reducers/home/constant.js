import action from '../action-method';
//常量
export const GET_GAME_TABLE =  Symbol('GET_GAME_TABLE');
export const SET_GAME_TABLE =  Symbol('SET_GAME_TABLE');
//方法
export const getGameTable = action(GET_GAME_TABLE);
export const setGameTable = action(SET_GAME_TABLE);
