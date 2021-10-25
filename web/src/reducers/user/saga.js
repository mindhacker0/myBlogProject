import { takeEvery, select, put } from 'redux-saga/effects';
import request from "../../lib/request";
import {
	GET_USER_ROUTE,
	USER_LOGIN,
    setUserRoute,
	setUserLogin
} from './constant';
import {closeModal} from "../modal/constant";
const routeUrl = "/getUserRoute";
const loginUrl = "/user/login";
function* fetchUserRoute({ type, payload:{params} }) {
	const { isSuccess, result, errors } = yield request(routeUrl,{
		method: "GET",
		params: params
	});
	if (isSuccess) {
		yield put(setUserRoute({userRoute:result.data}));
	} else {
		console.error("request error "+errors);
	}
}
function* userLogin({ type, payload:{params} }) {//登录接口
	const { isSuccess, result, errors } = yield request(loginUrl,{
		method: "GET",
		params: params
	});
	if (isSuccess) {
		const {token} = result;
		localStorage.setItem("token",token);//token存入本地存储，该token含有用户ID信息
		yield put(closeModal({modalName:"loginModal"}));
		yield put(setUserLogin({isLogin:true}));
	} else {
		console.error("request error "+errors);
	}
}
function* userSaga() {
    yield takeEvery(GET_USER_ROUTE, fetchUserRoute);
	yield takeEvery(USER_LOGIN, userLogin);
}
export default userSaga;