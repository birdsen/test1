import { createStore, combineReducers } from "redux";
import countReducer from "./slices/count";

const allReducer = combineReducers({
    countState: countReducer,
});

const store = createStore(allReducer);

export default store;
