import { combineReducers } from 'redux';
import user from './user/reducer';
import home from './home/reducer';
import modal from './modal/reducer';
export default combineReducers({
	user,
	home,
	modal
});
