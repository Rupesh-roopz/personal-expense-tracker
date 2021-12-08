const monthDateFormat =  (date) => {
    const dateFormat = `${date.slice(0,4)},${date.slice(5,7)},${date.slice(8,11)}`;

    return dateFormat;
}

module.exports = {monthDateFormat}
