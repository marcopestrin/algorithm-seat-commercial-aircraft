import React from "react";
import { useDispatch } from "react-redux";
import { RESERVE_SEAT } from "../../redux/actions";
import "./styles.scss";

const Commands = () => {

  const dispatch = useDispatch();

  const addOne = () => dispatch({
    type: RESERVE_SEAT,
    payload: {
      passengers: 1
    }
  })

  const addTwo = () => dispatch({
    type: RESERVE_SEAT,
    payload: {
      passengers: 2
    }
  })

  const addThree = () => dispatch({
    type: RESERVE_SEAT,
    payload: {
      passengers: 3
    }
  })

  return (
      <>
        <button onClick={addOne} >add 1</button>
        <button onClick={addTwo}>add 2</button>
        <button onClick={addThree}>add 3</button>
      </>
    )
}

export default Commands