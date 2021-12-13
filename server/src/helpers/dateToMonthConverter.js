const month =  (date) => {
    const dateFormat = `${date.slice(0,4)},${date.slice(5,7)},${date.slice(8,11)}`;
    const month = new Date(dateFormat).getMonth() + 1;

    return month;
}

module.exports = {month}
