export const dateToString = (payload) => {
    const date = new Date(payload);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${day}.${month >=10 ? month: '0' + month}.${year}`;
};