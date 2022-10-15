import { createSlice } from "@reduxjs/toolkit";

const initialState = { count: 0 };

/**--countSlice--
 * 接收一组 reducer 函数的对象，一个 slice 切片名和初始状态 initial state，
 * 并自动生成具有相应 action creator 和 action type 的 slice reducer
 */
export const countSlice = createSlice({
    name: "counter",
    initialState: initialState,
    reducers: {
        increment: (state, action) => {
            state.count += action.payload;
        },
        decrement: (state, action) => {
            state.count -= action.payload;
        },
    },
});

// 向UI组件暴露 actions
export const { increment, decrement } = countSlice.actions;

// 向 store 暴露 reducer
export default countSlice.reducer;
