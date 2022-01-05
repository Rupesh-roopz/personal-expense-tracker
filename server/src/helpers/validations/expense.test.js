const { expenseFormValidation } = require('./expense');
const { currentDate } = require('../manageDates');

describe('Expense form validation', () => {
    test('Valid expense form', async () => {
        const date = currentDate();

        const mockExpenseForm = {
            date : date,
            amount : 2000
        }
        await expenseFormValidation(mockExpenseForm)
            .then( data => expect(data).toBe(1))
    });

    test('Expense date need to be current month', async () => {
        try {
            const mockExpenseForm = {
                date : '2021-11-22',
                amount : 2000
            }
            await expenseFormValidation(mockExpenseForm)
                .then( () => expect().toThrow())
        } catch (error) {
            expect(error)
                .toEqual({ errorMessage : 'choose date from current month' })
        }   
    });

    test('Expense amount equals zero', async () => {
        try {
            const date = currentDate()
            const mockExpenseForm = {
                date : date,
                amount : 0
            }
            await expenseFormValidation(mockExpenseForm)
                .then( () => expect().toThrow())
        } catch (error) {
            expect(error)
                .toEqual({ errorMessage : 'Please enter minimum amount' })
        }
    })

})