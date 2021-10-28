import action from '../action-method';
//常量
export const GET_PROJECT_LIST = Symbol("GET_PROJECT_LIST");
export const SET_PROJECT_LIST = Symbol("SET_PROJECT_LIST");
export const SET_FILE_FOLDER = Symbol("SET_FILE_FOLDER");
//方法
export const getProjectList = action(GET_PROJECT_LIST);
export const setProjectList = action(SET_PROJECT_LIST);
export const setFileFolder = action(SET_FILE_FOLDER);