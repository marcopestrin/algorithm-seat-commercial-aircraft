const narrowBody = [
//[a,b,c,  d,e,f]
  [0,0,0,  0,0,0],
  [0,0,0,  0,0,0],
  [0,0,0,  0,0,0],
  // fine business class
  [0,0,0,  0,0,0],
  [0,0,0,  0,0,0], // 4
  [0,0,0,  0,0,0],
  [0,0,0,  0,0,0],
  [0,0,0,  0,0,0],
  [0,0,0,  0,0,0],
  // emergency exit
  [0,0,0,  0,0,0],
  [0,0,0,  0,0,0], // 10
  [0,0,0,  0,0,0],
  [0,0,0,  0,0,0],
  [0,0,0,  0,0,0],
  [0,0,0,  0,0,0],
  [0,0,0,  0,0,0], // 15
  // inizio parte inferiore
  [0,0,0,  0,0,0],
  [0,0,0,  0,0,0],
  [0,0,0,  0,0,0],
  [0,0,0,  0,0,0], // 19
//[a,b,c,  d,e,f]

];

let total = 0;
let right = 0;
let left = 0;
const totalRow = narrowBody.length - 1;

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
    default: 'x'                             
  }
}

const getSeat = ({ row, nSeat, side }) => {
  let _startPosition = 2; // posto C
  if (side === 'left') _startPosition = 0;
  if (side === 'right') _startPosition = 3;
  const _endPosition = _startPosition + nSeat;
  for (let i = _startPosition; i < _endPosition; i++) {
    // if (narrowBody[row][i] !== 0) throw 'Seat already occuped';
    narrowBody[row][i] = `${row}${getLetterSeat(i)}`;
  }
  if (side === 'left') left = left + nSeat;
  if (side === 'right') right = right + nSeat;
  if (side === 'both') {
    right = right + nSeat;
    left = left + nSeat;
  }
  total = total + nSeat;
}

const reserve3Passengers = () => {
  for (let i = totalRow; i > 2; i--) {
    // fila 0, 1, 2 sono business class
    let row = i
    if (left < right) {
      // controllo se ci sono posti liberi
      if (narrowBody[row][0] === 0 && narrowBody[row][1] === 0 && narrowBody[row][2] === 0) {
        getSeat({
          row,
          nSeat: 3,
          side: "left"
        });
        break;
      }
    }
    // controllo se ci sono posti liberi
    if (narrowBody[row][3] === 0 && narrowBody[row][4] === 0 && narrowBody[row][5] === 0) {
      getSeat({
        row,
        nSeat: 3,
        side: "right"
      });
      break;     
    }
  }
  // TODO: le persone devono separarsi

}

const reserve1Passengers = () => {
  for (let i = totalRow; i > 2; i--) {
    // fila 0, 1, 2 sono business class
    let row = i
      // controllo se ci sono posti liberi
      for (let column = 0; column < 6; column++) {
        if (narrowBody[row][column] === 0) {
          narrowBody[row][column] = `${row}${getLetterSeat(column)}`;
          if ([0,1,2].includes(column)) left++
          if ([3,4,5].includes(column)) right++
          total++
          return;
        }
      }
  }
  // TODO: le persone devono separarsi

}

const reserve2Passengers = () => {
  for (let i = totalRow; i > 2; i--) {
    // fila 0, 1, 2 sono business class
    let row = i
    // controllo se ci sono posti liberi
    if (narrowBody[row][0] === 0 && narrowBody[row][1] === 0) {
      getSeat({
        row,
        nSeat: 2,
        side: "left"
      });
      break;
    }
    if (narrowBody[row][2] === 0 && narrowBody[row][3] === 0) {
      getSeat({
        row,
        nSeat: 2,
        side: "both"
      });
      break;
    }
    if (narrowBody[row][4] === 0 && narrowBody[row][5] === 0) {
      getSeat({
        row,
        nSeat: 2,
        side: "right"
      });
      break;
    }
  }
  // TODO: le persone devono separarsi

};

function reserveSeat(nSeat) {
  try {
    if (total > 120) {
      return 'aircraft full'
    }
    if (total < 24) {
      // i primi 24 a prenotare devono occupare parte posteriore del velivolo
      if (nSeat === 3) {
        reserve3Passengers();
      }
      if (nSeat === 2) {
        reserve2Passengers();
      }
      if (nSeat === 1) {
        reserve1Passengers();
      }
    }
    // dall'11esimo in poi a prenotare
  } catch (error) {
    console.log({ error });
  }
}

reserveSeat(3) // si inizia a popolare da destra
reserveSeat(3)
reserveSeat(2) // si inizia a popolare da sinistra
reserveSeat(2)
reserveSeat(3)
reserveSeat(1)
reserveSeat(2)
reserveSeat(3)
reserveSeat(1)
reserveSeat(1)
console.log({
  right,
  left,
  total
})
console.log(narrowBody)

