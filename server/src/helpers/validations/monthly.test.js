const { monthlyExpenseValidation } = require('./monthly');
const { currentDate } = require('../manageDates')

describe('Monthly validation', () => {
    test('Is current month', async () => {
        const date = currentDate();
        const mockExpenseForm = {
            monthStartingDate : date
        }
        await monthlyExpenseValidation(mockExpenseForm)
        .then( data => expect(data).toBe(1))
    });

    test('If not current month', async () => {
        try {
            const date = '2021-11-29';
            const mockExpenseForm = {
                monthStartingDate : date
            }
            await monthlyExpenseValidation(mockExpenseForm)
            .then(() => expect().toThrow())
        } catch(error) {
            expect(error).toEqual({ errorMessage : 'Please select a date from current month' })
        }
    })

})

