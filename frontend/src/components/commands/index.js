import React from "react";
import { useDispatch } from "react-redux";
import { RESERVE_SEAT } from "../../redux/actions";
import Counter from '../counter';
import "./styles.scss";

const Commands = () => {

  const dispatch = useDispatch();

  const add = (rate, passengers) => dispatch({
    type: RESERVE_SEAT,
    payload: { rate, passengers }
  })

  return (
      <div className="control">
        <Counter />
        <p>Business Class:</p>
        <button className="business" onClick={() => add('business', 1)} >Add <strong>1</strong> passenger</button>
        <button className="business" onClick={() => add('business', 2)}>Add <strong>2</strong> passengers</button>
        <button className="business" onClick={() => add('business', 3)}>Add <strong>3</strong> passengers</button>
        <br />
        <p>Economy Class:</p>
        <button className="economy" onClick={() => add('economy', 1)} >Add <strong>1</strong> passenger</button>
        <button className="economy" onClick={() => add('economy', 2)}>Add <strong>2</strong> passengers</button>
        <button className="economy" onClick={() => add('economy', 3)}>Add <strong>3</strong> passengers</button>
      </div>
    )
}

export default Commands