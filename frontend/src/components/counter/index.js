import React from "react";
import { useSelector } from "react-redux";
import { selectorNarrowbody } from '../../redux/selectors';
import "./styles.scss";
const Counter =() => {
  const {
    totalCounter,
    rightCounter,
    leftCounter,
    totalRow
  } = useSelector(selectorNarrowbody);
  return (
    <div className="counter">
      <p>Total passenger: <strong>{totalCounter}</strong> ({(Math.floor(totalCounter/(totalRow*6)*100))}%)</p>
      <p>Left side: <strong>{leftCounter}</strong> ({(rightCounter || leftCounter) && (Math.floor(leftCounter/totalCounter*100))}%)</p>
      <p>Right side: <strong>{rightCounter}</strong> ({(rightCounter || leftCounter) && (Math.floor(rightCounter/totalCounter*100))}%)</p>
    </div>
  )
}
export default Counter;