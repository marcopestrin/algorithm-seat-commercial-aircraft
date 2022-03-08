import React from "react";
import { useSelector } from "react-redux";
import { selectorNarrowbody } from '../../redux/selectors';
import "./styles.scss";

const Aircraft = () => {

    const {
      limitRowBusinessClass,
      rowMiddle,
      matrix
    } = useSelector(selectorNarrowbody);
    
    return (
      <div className="aircraft">
        {
          matrix.map((row, indexRow) => {
            const seat = row.map((column, index) => {
              return (
                <div
                  key={`${indexRow}${index}`}
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