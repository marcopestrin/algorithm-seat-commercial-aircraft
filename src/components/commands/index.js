import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RESERVE_SEAT } from "../../redux/actions";
import { selectorNarrowbody } from '../../redux/selectors';
import Counter from '../counter';
import "./styles.scss";

const Commands = () => {

  const dispatch = useDispatch();
  const { fullBusinessClass } = useSelector(selectorNarrowbody);

  const add = (rate, passengers) => dispatch({
    type: RESERVE_SEAT,
    payload: { rate, passengers }
  })

  return (
      <div className="control">
        <Counter />
        <p>Business Class:</p>
        <button
          disabled={fullBusinessClass}
          className={`business ${fullBusinessClass ? ' fullBusinessClass ' : '' }`}
          onClick={() => add('business', 1)}
        >
          Add <strong>1</strong> passenger
        </button>
        <br />
        <p>Economy Class:</p>
        <button className="economy" onClick={() => add('economy', 1)} >Add <strong>1</strong> passenger</button>
        <button className="economy" onClick={() => add('economy', 2)}>Add <strong>2</strong> passengers</button>
        <button className="economy" onClick={() => add('economy', 3)}>Add <strong>3</strong> passengers</button>
      </div>
    )
}

export default Commands