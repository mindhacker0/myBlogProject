import { takeEvery, select, put } from 'redux-saga/effects';
import request from "../../lib/request";
import {
	GET_GAME_TABLE,
    setGameTable
} from './constant';
const listUrl = '/home/getList';
function* fetchGameTable({ type, payload:{params} }) {
	const { isSuccess, result, errors } = yield request(listUrl,{
		method: "POST",
		params: params
	});
	if (isSuccess) {
		yield put(setGameTable({gameTable:result.data}));
	} else {
		console.error("request error "+errors);
	}
}
function* homeSaga() {
    yield takeEvery(GET_GAME_TABLE, fetchGameTable);
}
export default homeSaga;