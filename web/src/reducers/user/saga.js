import { takeEvery, select, put } from 'redux-saga/effects';
import request from "../../lib/request";
import {
	GET_USER_ROUTE,
	USER_LOGIN,
	GET_USER_INFO,
    setUserRoute,
	setUserLogin,
	setUserInfo,
	getUserInfo
} from './constant';
import {closeModal} from "../modal/constant";
const routeUrl = "/getUserRoute";
const loginUrl = "/user/login";
const userInfoUrl = "/user/getUserInfo";
function* fetchUserRoute({ type, payload:{params} }) {//获取用户路由信息
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
		yield put(getUserInfo());
	} else {
		console.error("request error "+errors);
	}
}
function* fetchUserInfo({ type, payload}) {//获取用户信息
	const { isSuccess, result, errors } = yield request(userInfoUrl,{
		method: "GET",
		params: {}
	});
	if (isSuccess) {
		yield put(setUserInfo({userInfo:result}));
		yield put(setUserLogin({isLogin:true}));
	} else {
		console.error("request error "+errors);
	}
}
function* userSaga() {
    yield takeEvery(GET_USER_ROUTE, fetchUserRoute);
	yield takeEvery(USER_LOGIN, userLogin);
	yield takeEvery(GET_USER_INFO, fetchUserInfo);
}
export default userSaga;