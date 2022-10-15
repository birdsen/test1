import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createIncrementAction,
  createDecrementAction,
} from "../redux/slices/count";

const Count = () => {
  const num = useSelector(state => state.countState.count)
  const dispatch = useDispatch()

  const handleIncrease = () => {
    dispatch(createIncrementAction(1))
  };
  const handleDecrease = () => {
    dispatch(createDecrementAction(1))
  };

  return (
    <div>
      <h1>当前求和为：{num}</h1>
      <button onClick={handleIncrease}>加1</button>
      <button onClick={handleDecrease}>减1</button>
    </div>
  );
};

export default Count