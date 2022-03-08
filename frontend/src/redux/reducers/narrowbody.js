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

const getSeat = ({ row, nSeat, startPosition, matrix, rightCounter, leftCounter, totalCounter }) => {
    const _endPosition = startPosition + nSeat;
    for (let i = startPosition; i < _endPosition; i++) {
      matrix[row][i] = `${row}${getLetterSeat(i)}`;
    }
    if (startPosition === 2 && nSeat === 2) {
        leftCounter++;
        rightCounter++;
        totalCounter =+ 2 ;
        return { totalCounter, rightCounter, leftCounter };
    }
    if ([0,1,2].includes(startPosition)) {
        leftCounter = leftCounter + nSeat;
    }
    if ([3,4,5].includes(startPosition)) {
        rightCounter = rightCounter + nSeat;
    }
    totalCounter = totalCounter + nSeat;
    return { totalCounter, rightCounter, leftCounter };
}

const reserve1Passengers = ({
    startRow,
    totalCounter,
    rightCounter,
    leftCounter,
    limitRowBusinessClass,
    matrix
}) => {
    for (let row = startRow; row > limitRowBusinessClass; row--) {
        // controllo se ci sono posti liberi
        for (let column = 0; column < 6; column++) {
            if (matrix[row][column] === 0) {
                matrix[row][column] = `${row}${getLetterSeat(column)}`;
                if ([0,1,2].includes(column)) leftCounter++;
                if ([3,4,5].includes(column)) rightCounter++;
                totalCounter++
                return { leftCounter, rightCounter, totalCounter }
            }
        }
    }
}

const reserve2Passengers = (input) => {
    const { startRow, limitRowBusinessClass, matrix } = input
    for (let row = startRow; row > limitRowBusinessClass; row--) {
        // controllo se ci sono posti liberi
        if ((matrix[row][0] === 0 && matrix[row][1] === 0)) {
            return getSeat({ row, nSeat: 2, startPosition: 0, ...input });
        }
        if ((matrix[row][1] === 0 && matrix[row][2] === 0)) {
            return getSeat({ row, nSeat: 2, startPosition: 1, ...input });
        }
        if (matrix[row][2] === 0 && matrix[row][3] === 0) {
            return getSeat({ row, nSeat: 2, startPosition: 2, ...input });
        }
        if (matrix[row][3] === 0 && matrix[row][4] === 0) {
            return getSeat({ row, nSeat: 2, startPosition: 3, ...input });
        }
        if (matrix[row][4] === 0 && matrix[row][5] === 0) {
            return getSeat({ row, nSeat: 2, startPosition: 4, ...input });
        }
    }
    // i passeggeri vengono separati
    const newInput = {
        ...input,
        startRow: input.totalRow
    }
    reserve1Passengers(newInput);
    return reserve1Passengers(newInput);  
  };


const reserve3Passengers = (input) => {
    const { startRow, limitRowBusinessClass, matrix, leftCounter, rightCounter } = input
    for (let row = startRow; row > limitRowBusinessClass; row--) {
      // fila 0, 1, 2 sono business class
        if (leftCounter < rightCounter) {
            // controllo se ci sono posti liberi
            if (matrix[row][0] === 0 && matrix[row][1] === 0 && matrix[row][2] === 0) {
                return getSeat({ row, nSeat: 3, startPosition: 0, ...input });
            }
        }
      // controllo se ci sono posti liberi
        if (matrix[row][3] === 0 && matrix[row][4] === 0 && matrix[row][5] === 0) {
            return getSeat({ row, nSeat: 3, startPosition: 3, ...input });
        }
    }
    // i passeggeri vengono separati
    const newInput = {
        ...input,
        startRow: input.totalRow
    }
    reserve2Passengers(newInput);
    return reserve1Passengers(newInput);
}

const reserverBusinessClass = ({ limitRowBusinessClass, rightCounter, leftCounter, matrix, totalCounter }) => {
    for (let row = 0; row < limitRowBusinessClass +1; row++) {
        const start = leftCounter > rightCounter ? 3 : 0;
        const limit = leftCounter > rightCounter ? 6 : 3;
        for (let column = start; column < limit ; column++) {
            if (matrix[row][column] === 0) {
                matrix[row][column] = `${row}${getLetterSeat(column)}`;
                if ([0,1,2].includes(column)) leftCounter++;
                if ([3,4,5].includes(column)) rightCounter++;
                totalCounter++;
                return { leftCounter, rightCounter, totalCounter };
            }
        }
        if (row === limitRowBusinessClass) {
            return { fullBusinessClass: true };
        }
    }
};

export default function narrowbody(prevState = {}, action){
  let clonedState = JSON.parse(JSON.stringify(prevState));
  const { type, payload } = action;

    switch (type) {
        case actions.RESERVE_SEAT:
            const { passengers, rate } = payload;
            const { totalCounter, totalRow, rowMiddle } = clonedState;
            let result = {}
            if (rate === "economy") {
                const startRow = totalCounter < 24 ? totalRow : rowMiddle;
                if (passengers === 3) {
                    result = reserve3Passengers({ startRow, ...clonedState });
                };
                if (passengers === 2) {
                    result = reserve2Passengers({ startRow, ...clonedState});
                }
                if (passengers === 1) {
                    result = reserve1Passengers({ startRow, ...clonedState});
                }
            }
            if (rate === "business") {
                result = reserverBusinessClass({ ...clonedState, });
            }
            clonedState = {
                ...clonedState,
                ...result
            };
            break;
        default:
            break;
    }
    return clonedState;
};