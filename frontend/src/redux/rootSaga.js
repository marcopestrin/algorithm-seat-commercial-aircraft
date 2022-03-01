import { takeLatest } from "redux-saga/effects";
import {
  RESERVE_ONE,
  RESERVE_TWO,
  RESERVE_THREE
} from './actions';
import {
  reserve1seat,
  reserve2seat,
  reserve3seat
} from './controller';

function* rootSaga() {
  yield takeLatest(RESERVE_ONE, reserve1seat);
  yield takeLatest(RESERVE_TWO, reserve2seat);
  yield takeLatest(RESERVE_THREE, reserve3seat);
}

export default rootSaga;