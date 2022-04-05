import { takeLatest } from "redux-saga/effects";
import { RESERVE_SEAT_BUSINESS_CLASS, RESERVE_SEAT_ECONOMY_CLASS, BUY_SEAT } from './actions';
import { reserveSeat, getPrice } from './controller';

function* rootSaga() {
  yield takeLatest(RESERVE_SEAT_BUSINESS_CLASS, reserveSeat);
  yield takeLatest(RESERVE_SEAT_ECONOMY_CLASS, reserveSeat);
  yield takeLatest(BUY_SEAT, getPrice)
}

export default rootSaga;