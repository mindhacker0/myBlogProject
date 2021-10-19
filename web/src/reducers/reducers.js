import { combineReducers } from 'redux';
import user from './user/reducer';
import home from './home/reducer';
export default combineReducers({
	user,
	home
});
