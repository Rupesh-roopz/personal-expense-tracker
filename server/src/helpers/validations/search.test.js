const { searchValidation } = require('./search');

describe('Search validation', () => {

    test('On valid search dates', async () => {
        const mockSearchDates = {
            fromDate : '2021-12-20',
            endDate : '2021-12-31'
        }

        await searchValidation(mockSearchDates)
            .then(data => expect(data).toBe(1));
    });

    test('On invalid dates', async () => {
        try {
            const mockSearchDates = {
                fromDate : '2021-12-20',
                endDate : '2021-12-12'
            }
    
            await searchValidation(mockSearchDates)
                .then(() => expect().toThrow());
        } catch(error) {
            expect(error).toEqual({
                errorMessage : 'Please input date correctly' 
            })
        }
    })
})