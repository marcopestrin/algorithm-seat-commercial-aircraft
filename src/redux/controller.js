export function* reserveSeat() {};
export async function getPrice({ payload }) {
  const url = "http://";
  const result = await fetch(`${url}?row=${payload.row}&column=${payload.column}`);
  return result;
};