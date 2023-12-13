import { all, call } from 'redux-saga/effects';
import userSaga from './user/saga';
import homeSaga from './home/saga';
export default function* () {
  yield all([
    call(userSaga),
    call(homeSaga),
  ]);
}
