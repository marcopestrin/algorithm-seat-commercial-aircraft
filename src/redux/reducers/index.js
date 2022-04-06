import { combineReducers } from "redux";
import narrowbody from "./narrowbody";
import price  from "./price";

const reducers = combineReducers({
    narrowbody,
    price
});
export default reducers;