import React from "react";
import { useDispatch } from "react-redux";
import { RESERVE_ONE, RESERVE_TWO, RESERVE_THREE } from "../../redux/actions";
import "./styles.scss";

const Commands = () => {

  const dispatch = useDispatch();

  const addOne = () => dispatch({
    type: RESERVE_ONE,
    payload: {}
  })

  const addTwo = () => dispatch({
    type: RESERVE_TWO,
    payload: {}
  })

  const addThree = () => dispatch({
    type: RESERVE_THREE,
    payload: {}
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