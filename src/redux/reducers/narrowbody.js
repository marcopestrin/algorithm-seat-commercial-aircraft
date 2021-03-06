import * as actions from "../actions";

const getLetterSeat = (seat) => ['a', 'b', 'c', 'd', 'e', 'f'][seat];

const getSeat = ({ row, nSeat, startPosition, matrix, rightCounter, leftCounter, totalCounter, economyCounter }) => {
    const _endPosition = startPosition + nSeat;
    for (let i = startPosition; i < _endPosition; i++) {
      matrix[row][i] = `${row}${getLetterSeat(i)}`;
    }
    if (startPosition === 2 && nSeat === 2) {
        leftCounter++;
        rightCounter++;
        economyCounter += 2;
        return { rightCounter, leftCounter };
    }
    if ([0,1,2].includes(startPosition)) {
        leftCounter = leftCounter + nSeat;
    }
    if ([3,4,5].includes(startPosition)) {
        rightCounter = rightCounter + nSeat;
    }
    totalCounter = totalCounter + nSeat;
    economyCounter = economyCounter + nSeat;
    return { totalCounter, rightCounter, leftCounter, economyCounter };
}

const reserve1Passengers = (input) => {
    const { startRow, limitRowBusinessClass, matrix } = input;
    for (let row = startRow; row > limitRowBusinessClass; row--) {
        // controllo se ci sono posti liberi
        for (let column = 0; column < 6; column++) {
            if (matrix[row][column] === 0) {
                return getSeat({...input, row, nSeat: 1, startPosition: column });
            }
        }
    }
    return reserve1Passengers({
        ...input,
        startRow: input.totalRow
    });
}

const reserve2Passengers = (input) => {
    const { startRow, limitRowBusinessClass, matrix } = input;
    for (let row = startRow; row > limitRowBusinessClass; row--) {
        // controllo se ci sono posti liberi
        if ((matrix[row][0] === 0 && matrix[row][1] === 0)) {
            return getSeat({ ...input, row, nSeat: 2, startPosition: 0 });
        }
        if ((matrix[row][1] === 0 && matrix[row][2] === 0)) {
            return getSeat({...input, row, nSeat: 2, startPosition: 1 });
        }
        if (matrix[row][2] === 0 && matrix[row][3] === 0) {
            return getSeat({...input, row, nSeat: 2, startPosition: 2 });
        }
        if (matrix[row][3] === 0 && matrix[row][4] === 0) {
            return getSeat({...input, row, nSeat: 2, startPosition: 3 });
        }
        if (matrix[row][4] === 0 && matrix[row][5] === 0) {
            return getSeat({...input, row, nSeat: 2, startPosition: 4 });
        }
    }
    // i passeggeri vengono separati
    
    return reserve1Passengers(reserve1Passengers({
        ...input,
        startRow: input.totalRow
    }));  
};


const reserve3Passengers = (input) => {
    const { startRow, limitRowBusinessClass, matrix, leftCounter, rightCounter } = input;
    for (let row = startRow; row > limitRowBusinessClass; row--) {
        // fila 0, 1, 2 sono business class
        if (leftCounter < rightCounter) {
            // controllo se ci sono posti liberi
            if (matrix[row][0] === 0 && matrix[row][1] === 0 && matrix[row][2] === 0) {
                return getSeat({ ...input, row, nSeat: 3, startPosition: 0 });
            }
        }
        // controllo se ci sono posti liberi
        if (matrix[row][3] === 0 && matrix[row][4] === 0 && matrix[row][5] === 0) {
            return getSeat({ ...input, row, nSeat: 3, startPosition: 3 });
        }
    }
    // i passeggeri vengono separati
    
    return reserve1Passengers(reserve2Passengers({
        ...input,
        startRow: input.totalRow
    }));
}

const reserverBusinessClass = ({ limitRowBusinessClass, rightCounter, leftCounter, matrix, businessCounter }) => {
    for (let row = 0; row < limitRowBusinessClass +1; row++) {
        const start = leftCounter > rightCounter ? 3 : 0;
        const limit = leftCounter > rightCounter ? 6 : 3;
        for (let column = start; column < limit ; column++) {
            if (matrix[row][column] === 0) {
                matrix[row][column] = `${row}${getLetterSeat(column)}`;
                if ([0,1,2].includes(column)) leftCounter++;
                if ([3,4,5].includes(column)) rightCounter++;
                businessCounter++;
                return { leftCounter, rightCounter, businessCounter };
            }
        }
    }
};

const reserveSeat = ({ column, row, matrix }) => {
    matrix[row][column] = `${row}${getLetterSeat(column)}`;
    return matrix
};

export default function narrowbody(prevState = {}, action){
  let clonedState = JSON.parse(JSON.stringify(prevState));
  const { type, payload } = action;
  const { totalRow, rowMiddle, economyCounter, totalCounter, economyClassTotalSeat, businessClassTotalSeat } = clonedState;
  let result = {};

    switch (type) {
        case actions.GOT_SEAT_PRICE:
            clonedState = {
                ...clonedState,
                ...payload
            }
            break;
        
        case actions.CONFIRM_PRICE:
            const {
                columnSelected: column,
                rowSelected: row,
                matrix
            } = clonedState;
            const newMatrix = reserveSeat({ column, row, matrix });
            clonedState = {
                ...clonedState,
                matrix: newMatrix,
                rowSelected: null,
                columnSelected: null,
                seatPrice: null
            };
            break;

        case actions.RESERVE_SEAT_BUSINESS_CLASS:
            result = reserverBusinessClass(clonedState);
            clonedState = {
                ...clonedState,
                ...result,
                totalCounter: result.leftCounter + result.rightCounter,
                fullBusinessClass: businessClassTotalSeat === result.businessCounter
            };
            break;
        case actions.RESERVE_SEAT_ECONOMY_CLASS:
            const { passengers } = payload;
            clonedState.startRow = economyCounter < 24 || totalCounter > 48 ? totalRow : rowMiddle;
            if (passengers === 3) {
                result = reserve3Passengers(clonedState);
            };
            if (passengers === 2) {
                result = reserve2Passengers(clonedState);
            };
            if (passengers === 1) {
                result = reserve1Passengers(clonedState);
            };
            clonedState = {
                ...clonedState,
                ...result,
                totalCounter: result.leftCounter + result.rightCounter,
                remainingSeatEconomyclass: economyClassTotalSeat - result.economyCounter
            };
            break;
        default:
            break;
    }

    return clonedState;
};