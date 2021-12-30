const { presentMonth, dateComparision,
    month, currentDate, getYear } = require('./manageDates');

describe('Manage dates', () => {

    test('Returns present month', () => {
        const currentMonth = new Date().getMonth() + 1;
        expect(presentMonth()).toBe(currentMonth)
    });

    test('On valid date comparing', () => {
        const fromDate = '2021-12-01';
        const endingDate = '2021-12-10';

        expect(dateComparision(fromDate, endingDate))
            .toBe(0)
    });

    test('On invalid date comparing', () => {
        const fromDate = '2021-12-10';
        const endingDate = '2021-12-01';

        expect(dateComparision(fromDate, endingDate))
            .toBe(1)
    });

    test('Return month from date', () => {
        const date = '2021-12-10';
        
        expect(month(date)).toBe(12)
    });

    test('Returning year', () => {
        const date = '2021-12-10';
        
        expect(getYear(date)).toBe(2021)
    })

    test('Returning current date as formatted string', () => {
        const date = new Date().toLocaleDateString();
        const dateString = `${date.slice(6,10)}-${date.slice(3,5)}-${date.slice(0,2)}`;
        
        expect(currentDate()).toBe(dateString)
    })
})