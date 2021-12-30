const { userValidation } = require('./signup');
const { currentDate } = require('../manageDates');

describe('User validation', () => {

    test('On successfull signup form submission', async () => {
        mockSignupForm = {
            firstName : "Elon",
            lastName : "Musk",
            gender : "male",
            dateOfBirth : "1978-06-29",
            profession : "Chief Incharge - tesla",
            phoneNumber : "9515084728",
            email : "elon.musk@test.com", 
            password : "testPass@123",
            reEnterPassword : "testPass@123",
            isAdmin : 0
        };

        await userValidation(mockSignupForm).then(data => 
            expect(data).toBe(1))
    });

    test('On empty first name field', async () => {
        try { 
            mockSignupForm = {
                firstName : "",
                lastName : "Musk",
                dateOfBirth : "1978-06-29",
                profession : "Chief Incharge - tesla",
                phoneNumber : "9515084728",
                email : "elon.musk@test.com", 
                password : "testPass@123",
                reEnterPassword : "testPass@123",
                isAdmin : 0
            };
    
            await userValidation(mockSignupForm).then(() => 
                expect().toThrow())
        } catch (error) {
            expect(error).toEqual({
                errorMessage : 'Please enter a first name'
            })
        }
    });

    test('On empty last name field', async () => {
        try { 
            mockSignupForm = {
                firstName : "Elon",
                lastName : "",
                dateOfBirth : "1978-06-29",
                profession : "Chief Incharge - tesla",
                phoneNumber : "9515084728",
                email : "elon.musk@test.com", 
                password : "testPass@123",
                reEnterPassword : "testPass@123",
                isAdmin : 0
            };
    
            await userValidation(mockSignupForm).then(() => 
                expect().toThrow())
        } catch (error) {
            expect(error).toEqual({
                errorMessage : 'Please enter a last name'
            })
        }
    });

    test('On empty profession field', async () => {
        try { 
            mockSignupForm = {
                firstName : "Elon",
                lastName : "Musk",
                dateOfBirth : "1978-06-29",
                profession : "",
                phoneNumber : "9515084728",
                email : "elon.musk@test.com", 
                password : "testPass@123",
                reEnterPassword : "testPass@123",
                isAdmin : 0
            };
    
            await userValidation(mockSignupForm).then(() => 
                expect().toThrow())
        } catch (error) {
            expect(error).toEqual({
                errorMessage : 'Please enter your profession'
            })
        }
    });

    test('On empty admin field', async () => {
        try { 
            mockSignupForm = {
                firstName : "Elon",
                lastName : "Musk",
                dateOfBirth : "1978-06-29",
                profession : "Chief Incharge - tesla",
                phoneNumber : "9515084728",
                email : "elon.musk@test.com", 
                password : "testPass@123",
                reEnterPassword : "testPass@123",
                isAdmin : ''
            };
    
            await userValidation(mockSignupForm).then(() => 
                expect().toThrow())
        } catch (error) {
            expect(error).toEqual({
                errorMessage : 'Please choose Admin field'
            })
        }
    });

    test('On invalid mobile number', async () => {
        try { 
            mockSignupForm = {
                firstName : "Elon",
                lastName : "Musk",
                dateOfBirth : "1978-06-29",
                profession : "Chief Incharge - tesla",
                phoneNumber : "4728",
                email : "elon.musk@test.com", 
                password : "testPass@123",
                reEnterPassword : "testPass@123",
                isAdmin : 0
            };
    
            await userValidation(mockSignupForm).then(() => 
                expect().toThrow())
        } catch (error) {
            expect(error).toEqual({
                errorMessage : 'Please enter a valid mobile number'
            })
        }
    });

    test('On invalid password', async () => {
        try { 
            mockSignupForm = {
                firstName : "Elon",
                lastName : "Musk",
                dateOfBirth : "1978-06-29",
                profession : "Chief Incharge - tesla",
                phoneNumber : "9515084728",
                email : "elon.musk@test.com", 
                password : "testPass",
                reEnterPassword : "testPass@123",
                isAdmin : 0
            };
    
            await userValidation(mockSignupForm).then(() => 
                expect().toThrow())
        } catch (error) {
            expect(error).toEqual({
                errorMessage : 'please enter a strong password'
            })
        }
    });

    test('Password must be same', async () => {
        try { 
            mockSignupForm = {
                firstName : "Elon",
                lastName : "Musk",
                dateOfBirth : "1978-06-29",
                profession : "Chief Incharge - tesla",
                phoneNumber : "9515084728",
                email : "elon.musk@test.com", 
                password : "testPass@123",
                reEnterPassword : "testPass@23",
                isAdmin : 0
            };
    
            await userValidation(mockSignupForm).then(() => 
                expect().toThrow())
        } catch (error) {
            expect(error).toEqual({
                errorMessage : 'password must be same'
            })
        }
    });

    test('Age field validation', async () => {
        try { 
            const date = currentDate();

            mockSignupForm = {
                firstName : "Elon",
                lastName : "Musk",
                dateOfBirth : date,
                profession : "Chief Incharge - tesla",
                phoneNumber : "9515084728",
                email : "elon.musk@test.com", 
                password : "testPass@123",
                reEnterPassword : "testPass@123",
                isAdmin : 0
            };
    
            await userValidation(mockSignupForm)
            .then(() => expect().toThrow())
        } catch (error) {
            expect(error).toEqual({
                errorMessage : 'Age must be greater than 15'
            })
        }
    });

    test('If multiple fields empty', async () => {
        try { 
            const date = currentDate();

            mockSignupForm = {
                firstName : "Elon",
                lastName : "Musk",
                dateOfBirth : '',
                profession : "Chief Incharge - tesla",
                phoneNumber : "",
                email : "", 
                password : "",
                reEnterPassword : "",
                isAdmin : ""
            };
    
            await userValidation(mockSignupForm)
            .then(() => expect().toThrow())
        } catch (error) {
            expect(error).toEqual({
                errorMessage : 'Please choose Admin field'
            })
        }
    });
})