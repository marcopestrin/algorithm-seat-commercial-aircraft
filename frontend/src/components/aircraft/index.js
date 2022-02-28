import React from "react";
import "./styles.scss";

const Aircraft = () => {
  const narrowBody = [
    //[A,B,C,  D,E,F]
      [0,0,0,  0,0,0],
      [1,0,0,  1,0,0],
      [0,0,0,  0,0,0], // 2 (limit business class)
      // business class
      [0,0,0,  0,0,0],
      [0,0,0,  0,0,0],
      [0,0,0,  0,0,0],
      [0,0,0,  0,0,0],
      [0,0,0,  0,0,0],
      [0,0,0,  0,0,0], // 8 (middle)
      // emergency exit
      [0,0,0,  0,0,0],
      [0,0,0,  0,0,0],
      [0,0,0,  0,0,0],
      [0,0,0,  0,0,0],
      [0,0,0,  0,0,0],
      [0,0,0,  0,0,0],
      [0,0,0,  0,0,0], // 15
      // starting bottom side
      [0,0,0,  0,0,0],
      [0,0,0,  0,0,0],
      [0,0,0,  0,0,0],
      [0,0,0,  0,0,0], // 19 (bottom)
    //[A,B,C,  D,E,F]
    ];
    return (
      <div className="aircraft">
        {
          narrowBody.map((row, indexRow) => {
            const seat = row.map((column, index) => {
              // console.log("column", column)

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