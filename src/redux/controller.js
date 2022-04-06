import { put } from "redux-saga/effects";
import { rates } from '../matrix'; 
import { CONFIRM_PRICE } from './actions';
import {
  isBusinessClass,
  isEconomyClass,
  isEmergencySeat,
  isAisle,
  isWindow
} from '../utils/seat';
export function* reserveSeat() {};
export function* getPrice(dispatched) {
  let price = 0;
  const { row, column } = dispatched.payload;
  // have here a HTTP call
  if (isBusinessClass(row)) price = rates.business;
  if (isEconomyClass(row)) price = rates.economy;
  if (isEmergencySeat(row)) price = rates.emergency;
  if (isWindow(column)) price = price + rates.window;
  if (isAisle(column)) price = price + rates.aisle;
  yield put({
    type: CONFIRM_PRICE,
    payload: price
  })
};