import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectorNarrowbody } from '../../redux/selectors';
import { BUY_SEAT } from "../../redux/actions";
import "./styles.scss";

const Aircraft = () => {
  const dispatch = useDispatch();
    const {
      limitRowBusinessClass,
      rowMiddle,
      matrix
    } = useSelector(selectorNarrowbody);

    const getSeat = (row, column) => {
      dispatch({
        type: BUY_SEAT,
        payload: {row, column }
      })
    }
    
    return (
      <div className="aircraft">
        {
          matrix.map((row, indexRow) => {
            const seat = row.map((column, index) => {
              return (
                <div
                  key={`${indexRow}${index}`}
                  onClick={() => getSeat(indexRow,index)}
                  className={`
                    seat
                    ${column === 0 ? ' free ' : ' occuped '}
                    ${(index + 1) % 3 ? '' : 'aisle'}
                  `}
                >
                  {column}
                </div>
              )
            });
            return (
              <div key={indexRow}>
                { seat }
                <div
                  key={indexRow}
                  className={`
                    end-row
                    ${indexRow === rowMiddle ? ' emergency-row ' : ''}
                    ${indexRow === limitRowBusinessClass ? ' end-business-class ' : ''}
                  `}
                >
                </div>
              </div>
            )
          })
        }
      </div>
    )
}

export default Aircraft