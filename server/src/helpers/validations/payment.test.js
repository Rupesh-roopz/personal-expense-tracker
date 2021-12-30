const { paymentMethodValdation } = require('./payment');

describe('Payment validation', () => {
    test('Successfull payment method', async () => {
        await paymentMethodValdation({
            paymentMethodName : 'Credit card'
        }).then( data => expect(data).toBe(1))
    });

    test('On empty payment field', async () => {
        try {
            await paymentMethodValdation({
                paymentMethodName : ''
            }).then( data => expect().toThrow());
        } catch (error) {
            expect(error).toEqual({
                errorMessage : 'Please enter a valid name' 
            })
        }
    });

    test('On invalid payment field', async () => {
        try {
            await paymentMethodValdation({
                paymentMethodName : 'cre4e'
            }).then( data => expect().toThrow());
        } catch (error) {
            expect(error).toEqual({
                errorMessage : 'Please enter a valid name' 
            })
        }
    });

    test('payment name length', async () => {
        try {
            await paymentMethodValdation({
                paymentMethodName : 'cre'
            }).then( data => expect().toThrow())
        } catch (error) {
            expect(error).toEqual({errorMessage : 'payment name must be strong'})
        }
    })
})