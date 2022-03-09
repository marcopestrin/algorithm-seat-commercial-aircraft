import narrowbody from "../matrix";

const initialState = {
  narrowbody: {
    matrix: narrowbody ,
    totalCounter: 0,
    rightCounter: 0,
    leftCounter: 0,
    economyCounter: 0,
    businessCounter: 0,
    limitRowBusinessClass: 2,
    rowMiddle: 8,
    totalRow: narrowbody.length - 1,
    fullBusinessClass: false,
    fullAircraft: false
  }
};

export default initialState