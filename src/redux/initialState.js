import narrowbody from "../matrix";

const limitRowBusinessClass = 2;
const totalRow = narrowbody.length - 1;
const businessClassTotalSeat = (limitRowBusinessClass + 1) * 6;
const economyClassTotalSeat = (totalRow - limitRowBusinessClass) * 6;

const initialState = {
  narrowbody: {
    matrix: narrowbody,

    totalCounter: 0,
    rightCounter: 0,
    leftCounter: 0,
    economyCounter: 0,
    businessCounter: 0,

    limitRowBusinessClass,
    businessClassTotalSeat,
    economyClassTotalSeat,
    remainingSeatEconomyclass: economyClassTotalSeat,
    totalRow,
    rowMiddle: 8,

    fullBusinessClass: false,
    fullAircraft: false
  }
};

export default initialState