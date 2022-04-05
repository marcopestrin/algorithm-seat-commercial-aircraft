import { rates } from '../matrix'; 
import {
  isBusinessClass,
  isEconomyClass,
  isEmergencySeat,
  isAisle,
  isWindow
} from '../utils/seat';
export function* reserveSeat() {};
export async function getPrice(dispatched) {
  let price = 0;
  const { row, column } = dispatched.payload;
  if (isBusinessClass(row)) price = rates.business;
  if (isEconomyClass(row)) price = rates.economy;
  if (isEmergencySeat(row)) price = rates.emergency;
  if (isWindow(column)) price = price + rates.window;
  if (isAisle(column)) price = price + rates.aisle;
  console.log(price);
  return price
};