import * as actions from "../actions";

const getLetterSeat = (seat) => {
    switch (seat) {
        case 0:
            return 'a'
        case 1:
            return 'b'
        case 2:
            return 'c'
        case 3:
            return 'd'
        case 4:
            return 'e'
        case 5:
            return 'f'
        default:
            return 'x'                             
    }
}


const getSeat = ({ row, nSeat, side, matrix, rightCounter, leftCounter, totalCounter }) => {
    let _startPosition = 2; // posto C
    if (side === 'left') _startPosition = 0;
    if (side === 'right') _startPosition = 3;
    const _endPosition = _startPosition + nSeat;
    for (let i = _startPosition; i < _endPosition; i++) {
      // if (matrix[row][i] !== 0) throw 'Seat already occuped';
      matrix[row][i] = `${row}${getLetterSeat(i)}`;
    }
    if (side === 'left') leftCounter = leftCounter + nSeat;
    if (side === 'right') rightCounter = rightCounter + nSeat;
    if (side === 'both') {
      rightCounter = rightCounter + nSeat;
      leftCounter = leftCounter + nSeat;
    }
    totalCounter = totalCounter + nSeat;
}

const reserve1Passengers = ({
    startRow,
    totalCounter,
    rightCounter,
    leftCounter,
    matrix
}) => {
    for (let row = startRow; row > 0; row--) {
        // controllo se ci sono posti liberi
        for (let column = 0; column < 6; column++) {
            if (matrix[row][column] === 0) {
                matrix[row][column] = `${row}${getLetterSeat(column)}`;
                if ([0,1,2].includes(column)) leftCounter++
                if ([3,4,5].includes(column)) rightCounter++
                totalCounter++
                return;
            }
        }
    }
}

const reserve2Passengers = (input) => {
    const { startRow, limitRowBusinessClass, matrix } = input
    for (let row = startRow; row > limitRowBusinessClass; row--) {
      // controllo se ci sono posti liberi
        if (matrix[row][0] === 0 && matrix[row][1] === 0) {
            getSeat({ row, nSeat: 2, side: "left", ...input });
            console.log("Left");
            return;
        }
        if (matrix[row][2] === 0 && matrix[row][3] === 0) {
            getSeat({ row, nSeat: 2, side: "both", ...input });
            console.log("Both");
            return;
        }
        if (matrix[row][4] === 0 && matrix[row][5] === 0) {
            getSeat({ row, nSeat: 2, side: "right", ...input });
            console.log("Right");
            return;
        }
    }
    // console.log("Split passengers");
    // i passeggeri vengono separati
    reserve1Passengers({ startRow, ...input });
    reserve1Passengers({ startRow, ...input });  
  };


const reserve3Passengers = (input) => {
    const { startRow, limitRowBusinessClass, matrix, leftCounter, rightCounter } = input
    for (let row = startRow; row > limitRowBusinessClass; row--) {
      // fila 0, 1, 2 sono business class
        if (leftCounter < rightCounter) {
            // controllo se ci sono posti liberi
            if (matrix[row][0] === 0 && matrix[row][1] === 0 && matrix[row][2] === 0) {
                getSeat({ row, nSeat: 3, side: "left", ...input });
                console.log("Left");
                return;
            }
        }
      // controllo se ci sono posti liberi
        if (matrix[row][3] === 0 && matrix[row][4] === 0 && matrix[row][5] === 0) {
            getSeat({ row, nSeat: 3, side: "right", ...input });
            console.log("Right");
            return;     
        }
    }
    // i passeggeri vengono separati
    // da testare!
    reserve2Passengers({ startRow, ...input });
    reserve1Passengers({ startRow, ...input });
}

export default function narrowbody(prevState = {}, action){
  let clonedState = JSON.parse(JSON.stringify(prevState));
  const { type, payload } = action;

    switch (type) {

        case actions.RESERVE_SEAT:
            const { passengers } = payload
            const { totalCounter, totalRow, rowMiddle } = clonedState
            const startRow = totalCounter < 24 ? totalRow : rowMiddle;
            if (passengers === 3) reserve3Passengers({ startRow, ...clonedState });
            if (passengers === 2) reserve2Passengers({ startRow, ...clonedState});
            if (passengers === 1) reserve1Passengers({ startRow, ...clonedState});
            break;

        default:
            break;
    }
    return clonedState;
};