import { takeEvery, select, put } from 'redux-saga/effects';
import request from "../../lib/request";
import {
	GET_USER_ROUTE,
    setUserRoute
} from './constant';
const routeUrl = '/getUserRoute';
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
function* userSaga() {
    yield takeEvery(GET_USER_ROUTE, fetchUserRoute);
}
export default userSaga;