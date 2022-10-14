import { INCREMENT, DECREMENT } from "../constants";

const initState = { count: 0 };

export default function countReducer(preState = initState, action) {
    const { type, data } = action;
    switch (type) {
        case INCREMENT:
            return { count: preState.count + data }; // 有return，就不需要break了
        case DECREMENT:
            return { count: preState.count - data };
        default:
            return preState;
    }
}

export const createIncrementAction = (data) => ({ type: INCREMENT, data }); // 圆括号是为了返回对象
export const createDecrementAction = (data) => ({ type: DECREMENT, data });
