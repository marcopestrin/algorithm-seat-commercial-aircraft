export const isWindow = (column) => column === 0 || column === 5;
export const isAisle = (column) => column === 3 || column === 2;
export const isBusinessClass = (row) => row < 3;
export const isEconomyClass = (row) => row > 2 && row !== 9;
export const isEmergencySeat = (row) => row === 9;
