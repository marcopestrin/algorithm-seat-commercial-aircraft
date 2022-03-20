import React from "react";
import { useSelector } from "react-redux";
import { selectorNarrowbody } from '../../redux/selectors';
import "./styles.scss";
const Counter =() => {
  const {
    totalCounter,
    rightCounter,
    leftCounter,
    totalRow,
    economyCounter,
    businessCounter
  } = useSelector(selectorNarrowbody);

  const getPercentageCapacity = () => {
    const totalSeat = (totalRow +1) * 6;
    return Math.floor(totalCounter/totalSeat * 100);
  };

  const getPercentageLeftSide = () => leftCounter && (Math.floor(leftCounter / totalCounter * 100));
  const getPercentageRightSide = () => rightCounter && (Math.floor(rightCounter / totalCounter * 100));
  const getPercentageBusinessClass = () => businessCounter && (Math.floor(businessCounter / totalCounter * 100));
  const getPercentageEconomyClass = () => economyCounter && (Math.floor(economyCounter / totalCounter * 100));

  return (
    <div className="counter">
      <p>Total passenger: <strong>{totalCounter}</strong> ({getPercentageCapacity()}%)</p>
      <p>Left side: <strong>{leftCounter}</strong> ({getPercentageLeftSide()}%)</p>
      <p>Right side: <strong>{rightCounter}</strong> ({getPercentageRightSide()}%)</p>
      <p>Business class: <strong>{businessCounter}</strong> ({getPercentageBusinessClass()}%)</p>
      <p>Economy class: <strong>{economyCounter}</strong> ({getPercentageEconomyClass()}%)</p>
    </div>
  )
}
export default Counter;