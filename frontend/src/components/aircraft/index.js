import React from "react";
import "./styles.scss";

const Aircraft = ({ narrowBody }) => {
    return (
      <div className="aircraft">
        {
          narrowBody.map((row, indexRow) => {
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
              <>
                { seat }
                <div
                  key={indexRow}
                  className={`
                    end-row
                    ${indexRow === 9 ? ' emergency-row ' : ''}
                    ${indexRow === 2 ? ' end-business-class ' : ''}
                  `
                  }
                >
                </div>
              </>
            )
          })
        }
      </div>
    )
}

export default Aircraft