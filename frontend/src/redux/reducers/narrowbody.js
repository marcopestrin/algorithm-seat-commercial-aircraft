import * as actions from "../actions";

export default function narrowbody(prevState = {}, action){
  let clonedState = JSON.parse(JSON.stringify(prevState));
  const { type, payload } = action;

    switch (type) {

        case actions.RESERVE_ONE:
            break;

        case actions.RESERVE_TWO:
            break;

        case actions.RESERVE_THREE:
            break;

        default:
            break;
    }
    return clonedState;
};