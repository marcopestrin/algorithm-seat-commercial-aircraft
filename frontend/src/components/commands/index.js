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
      <div className="control">
        <button onClick={addOne} >Add 1 passenger</button>
        <button onClick={addTwo}>Add 2 passengers</button>
        <button onClick={addThree}>Add 3 passengers</button>
      </div>
    )
}

export default Commands