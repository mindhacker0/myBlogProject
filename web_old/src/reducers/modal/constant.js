import action from '../action-method';
//常量
export const OPEN_MODAL = Symbol("OPEN_MODAL");
export const CLOSE_MODAL = Symbol("CLOSE_MODAL");
//方法
export const openModal = action(OPEN_MODAL);
export const closeModal = action(CLOSE_MODAL);
