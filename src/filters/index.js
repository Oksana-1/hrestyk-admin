export const dateToString = (payload) => {
  const date = new Date(payload);
  const day = date.getDate();
  const month = date.getMonth() + 1; //starts from 0
  const year = date.getFullYear();
  return `${day}.${month >= 10 ? month : "0" + month}.${year}`;
};
export const roundSum = (sum) => {
  return sum.toFixed(2);
};
