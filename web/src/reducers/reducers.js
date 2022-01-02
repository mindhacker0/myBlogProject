import { combineReducers } from 'redux';
import user from './user/reducer';
import home from './home/reducer';
import modal from './modal/reducer';
import project from './project/reducer';
import editor from './editor/reducer';
export default combineReducers({
	user,
	home,
	modal,
	editor,
	project
});
