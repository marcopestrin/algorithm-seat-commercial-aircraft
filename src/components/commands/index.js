import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack, Button, Typography, Grid, Divider } from '@mui/material';
import { RESERVE_SEAT_ECONOMY_CLASS, RESERVE_SEAT_BUSINESS_CLASS } from "../../redux/actions";
import { selectorNarrowbody } from '../../redux/selectors';
import Counter from '../counter';

const Commands = () => {

  const dispatch = useDispatch();
  const { fullBusinessClass, remainingSeatEconomyclass } = useSelector(selectorNarrowbody);

  const addEconomy = (passengers) => dispatch({
    type: RESERVE_SEAT_ECONOMY_CLASS,
    payload: { passengers }
  })
  const addBusiness = () => dispatch({
    type: RESERVE_SEAT_BUSINESS_CLASS
  })

  return (
    <>
      <Grid item container spacing={2}>
        <Grid item container spacing={2}>
          <Counter />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="p" component="p">
              Business Class:
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={2} direction="row">
              <Button
                disabled={fullBusinessClass}
                onClick={() => addBusiness()}
                variant="contained"
              >Add <strong>1</strong> passenger</Button>
            </Stack>
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="p" component="p">
              Economy Class:
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={3} direction="row">
              <Button
                disabled={remainingSeatEconomyclass < 1}
                onClick={() => addEconomy(1)}
                variant="contained"
              >Add <strong>1</strong> passenger</Button>
              <Button
                disabled={remainingSeatEconomyclass < 2}
                onClick={() => addEconomy(2)}
                variant="contained"
              >Add <strong>2</strong> passengers</Button>
              <Button
                disabled={remainingSeatEconomyclass < 3}
                onClick={() => addEconomy(3)}
                variant="contained"
              >Add <strong>3</strong> passengers</Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </>   
    )
}

export default Commands