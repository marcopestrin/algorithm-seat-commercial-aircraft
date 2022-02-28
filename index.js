const narrowBody = [
  //[A,B,C,  D,E,F]
    [0,0,0,  0,0,0],
    [0,0,0,  0,0,0],
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
  
  let totalCounter = 0;
  let rightCounter = 0;
  let leftCounter = 0;
  const LIMIT_ROW_BUSINESS_CLASS = 2;
  const ROW_MIDDLE = 8;
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
      if (narrowBody[row][i] !== 0) throw 'Seat already occuped';
      narrowBody[row][i] = `${row}${getLetterSeat(i)}`;
    }
    if (side === 'left') leftCounter = leftCounter + nSeat;
    if (side === 'right') rightCounter = rightCounter + nSeat;
    if (side === 'both') {
      rightCounter = rightCounter + nSeat;
      leftCounter = leftCounter + nSeat;
    }
    totalCounter = totalCounter + nSeat;
  }
  
  const reserve3Passengers = ({ startRow }) => {
    for (let row = startRow; row > LIMIT_ROW_BUSINESS_CLASS; row--) {
      // fila 0, 1, 2 sono business class
      if (leftCounter < rightCounter) {
        // controllo se ci sono posti liberi
        if (narrowBody[row][0] === 0 && narrowBody[row][1] === 0 && narrowBody[row][2] === 0) {
          getSeat({ row, nSeat: 3, side: "left" });
          break;
        }
      }
      // controllo se ci sono posti liberi
      if (narrowBody[row][3] === 0 && narrowBody[row][4] === 0 && narrowBody[row][5] === 0) {
        getSeat({ row, nSeat: 3, side: "right" });
        break;     
      }
    }
    // i passeggeri vengono separati
    // da testare!
    reserveSeat(2);
    reserveSeat(1);    }
  
  const reserve1Passengers = ({ startRow }) => {
    for (let row = startRow; row > 0; row--) {
      // controllo se ci sono posti liberi
      for (let column = 0; column < 6; column++) {
        if (narrowBody[row][column] === 0) {
          narrowBody[row][column] = `${row}${getLetterSeat(column)}`;
          if ([0,1,2].includes(column)) leftCounter++
          if ([3,4,5].includes(column)) rightCounter++
          totalCounter++
          return;
        }
      }
    }  
  }
  
  const reserve2Passengers = ({ startRow }) => {
    for (let row = startRow; row > LIMIT_ROW_BUSINESS_CLASS; row--) {
      // controllo se ci sono posti liberi
      if (narrowBody[row][0] === 0 && narrowBody[row][1] === 0) {
        getSeat({ row, nSeat: 2, side: "left" });
        break;
      }
      if (narrowBody[row][2] === 0 && narrowBody[row][3] === 0) {
        getSeat({ row, nSeat: 2, side: "both" });
        break;
      }
      if (narrowBody[row][4] === 0 && narrowBody[row][5] === 0) {
        getSeat({ row, nSeat: 2, side: "right" });
        break;
      }
    }
    // i passeggeri vengono separati
    // da testare!
    reserveSeat(1);
    reserveSeat(1);  
  };
  
  function reserveSeat(nSeat) {
    try {
      if (totalCounter > 120) return 'aircraft full'
      const startRow = totalCounter < 24 ? totalRow : ROW_MIDDLE;
      // i primi 24 a prenotare devono occupare parte posteriore del velivolo
      // dopo si parte a popolare da metà in su
      if (nSeat === 3) reserve3Passengers({ startRow });
      if (nSeat === 2) reserve2Passengers({ startRow });
      if (nSeat === 1) reserve1Passengers({ startRow });
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
  reserveSeat(2)
  reserveSeat(3)
  reserveSeat(3)
  reserveSeat(3)
  reserveSeat(3)
  reserveSeat(1)
  reserveSeat(3)
  reserveSeat(2)
  console.log({
    rightCounter,
    leftCounter,
    totalCounter
  })
  console.log(narrowBody)
  
  