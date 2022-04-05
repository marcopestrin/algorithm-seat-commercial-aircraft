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
export const rates = {
  business: 120, // class
  economy: 70, // class
  emergency: 90, // replace class
  window: 6, // to add to class
  aisle: 5 // to add to class
}

export default narrowBody