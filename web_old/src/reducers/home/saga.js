import { takeEvery, select, put } from 'redux-saga/effects';
import request from "../../lib/request";
import {
	GET_NOTICE_INFO,
    setNoticeInfo
} from './constant';
const listUrl = '/home/getList';
function* fetchNoticeInfo({ type, payload:{params} }) {
	const { isSuccess, result, errors } = yield request(listUrl,{
		method: "POST",
		params: params
	});
	if (isSuccess) {
		yield put(setNoticeInfo({noticeInfo:result.data}));
	} else {
		console.error("request error "+errors);
	}
}
function* homeSaga() {
    yield takeEvery(GET_NOTICE_INFO, fetchNoticeInfo);
}
export default homeSaga;