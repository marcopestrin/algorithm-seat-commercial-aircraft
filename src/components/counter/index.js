import React from "react";
import { useSelector } from "react-redux";
import { Grid, Typography } from '@mui/material';
import { selectorNarrowbody } from '../../redux/selectors';
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
    <>
      <Grid item xs={12}>
        <Typography component="p">Total passenger: <strong>{totalCounter}</strong> ({getPercentageCapacity()}%)</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography component="p">Left side: <strong>{leftCounter}</strong> ({getPercentageLeftSide()}%)</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography component="p">Right side: <strong>{rightCounter}</strong> ({getPercentageRightSide()}%)</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography component="p">Business class: <strong>{businessCounter}</strong> ({getPercentageBusinessClass()}%)</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography component="p">Economy class: <strong>{economyCounter}</strong> ({getPercentageEconomyClass()}%)</Typography>
      </Grid>
    </>
  )
}
export default Counter;