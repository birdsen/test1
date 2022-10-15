import React from "react";
import { connect } from "react-redux";
import {
  createIncrementAction,
  createDecrementAction,
} from "../redux/slices/count";

const Count = (props) => {
  const handleIncrease = () => {
    props.increase();
  };
  const handleDecrease = () => {
    props.decrease();
  };

  return (
    <div>
      <h1>当前求和为：{props.count}</h1>
      <button onClick={handleIncrease}>加1</button>
      <button onClick={handleDecrease}>减1</button>
    </div>
  );
};

export const mapStateToProps = (state) => ({
  count: state.countState.count, 
});

export const mapDispatchToProps = (dispatch) => ({
  increase: () => {
    dispatch(createIncrementAction(1));
  },
  decrease: () => {
    dispatch(createDecrementAction(1));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Count);
