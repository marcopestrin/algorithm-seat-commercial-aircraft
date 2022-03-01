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

export default function narrowbody(prevState = {}, action){
  let clonedState = JSON.parse(JSON.stringify(prevState));
  const { type, payload } = action;

    switch (type) {

        case actions.RESERVE_SEAT:
            const { passengers } = payload
            const { totalCounter, totalRow, rowMiddle } = clonedState
            const startRow = totalCounter < 24 ? totalRow : rowMiddle;
            if (passengers === 1) reserve1Passengers({ startRow, ...clonedState});
            break;

        default:
            break;
    }
    return clonedState;
};