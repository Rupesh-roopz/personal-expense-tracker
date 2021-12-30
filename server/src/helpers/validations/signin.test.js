const { signinValidation } = require('./signin');

describe('signin validation', () => {
    test('On valid signin form submission', async () => {
        const mockSigninForm = {
            email : 'pet@test.com',
            password : 'test@pass123'
        }
        await signinValidation(mockSigninForm)
            .then(data => expect(data).toBe(1))
    });

    test('On invalid email id field', async () => {
        try {
            const mockSigninForm = {
                email : 'pettest.com',
                password : 'test@pass123'
            }
            await signinValidation(mockSigninForm)
                .then(() => expect().toThrow())
        } catch (error) {
            expect(error).toEqual({
                errorMessage : 'Please enter a valid Email' 
            })
        }
    });

    test('On empty email id field', async () => {
        try {
            const mockSigninForm = {
                email : '',
                password : 'test@pass123'
            }
            await signinValidation(mockSigninForm)
                .then(() => expect().toThrow())
        } catch (error) {
            expect(error).toEqual({
                errorMessage : 'Please enter a valid Email' 
            })
        }
    });

    test('On empty password field', async () => {
        try {
            const mockSigninForm = {
                email : 'pet@test.com',
                password : '  '
            }
            await signinValidation(mockSigninForm)
                .then(() => expect().toThrow())
        } catch (error) {
            expect(error).toEqual({
                errorMessage : 'Please enter password' 
            })
        }
    })
})