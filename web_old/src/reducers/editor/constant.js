import action from '../action-method';
//常量
export const LOAD_FILE = Symbol("EDITOR_LOAD_FILE");
//方法
export const loadFile = action(LOAD_FILE);

