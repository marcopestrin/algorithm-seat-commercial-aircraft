import { takeLatest } from "redux-saga/effects";
import { RESERVE_SEAT_BUSINESS_CLASS, RESERVE_SEAT_ECONOMY_CLASS } from './actions';
import { reserveSeat } from './controller';

function* rootSaga() {
  yield takeLatest(RESERVE_SEAT_BUSINESS_CLASS, reserveSeat);
  yield takeLatest(RESERVE_SEAT_ECONOMY_CLASS, reserveSeat);
}

export default rootSaga;