import { takeLatest } from "redux-saga/effects";
import { RESERVE_SEAT } from './actions';
import { reserveSeat } from './controller';

function* rootSaga() {
  yield takeLatest(RESERVE_SEAT, reserveSeat);
}

export default rootSaga;