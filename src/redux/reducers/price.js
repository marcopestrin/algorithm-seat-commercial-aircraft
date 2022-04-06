
import * as actions from "../actions";

export default function price(prevState = {}, action){
  let clonedState = JSON.parse(JSON.stringify(prevState));
  const { type, payload } = action;
  
  switch (type) {
    case actions.CONFIRM_PRICE:
        clonedState.seatPrice = payload
        break;    
    default:
        break;
  }
  return clonedState;
}