import { configureStore } from "@reduxjs/toolkit";
import countReducer from "./slices/count";

const store = configureStore({
    reducer: {
        counter: countReducer,
    },
});

export default store;
