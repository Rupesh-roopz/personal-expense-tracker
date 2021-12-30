const { categoryValidation } = require('./category');

describe('Category requests validation', () => {

    test('Valid category name ', async () => {
            await categoryValidation({ categoryName : 'Credit' }).then( data => {
                expect(data).toBe(1);
            });
    });

    test('Empty category name', async () => {
        try {
             await categoryValidation({ categoryName : '' }).then( () => {
              expect().toThrow();
            });
            await categoryValidation({ categoryName : 'credit4' }).then( () => {
                expect().toThrow();
              });
        } catch(error) {
            expect(error).toEqual({ 'errorMessage': 'Please enter valid category name' });
        }
    });


    test('Invalid category name', async () => {
        try {
            await categoryValidation({ categoryName : 'credit4' }).then( () => {
                expect().toThrow();
              });
        } catch(error) {
            expect(error).toEqual({ 'errorMessage': 'Please enter valid category name' });
        }
    });

    test('Category name length', async () => {
        try {
             await categoryValidation({ categoryName : 'cre' }).then( () => {
              expect().toThrow();
            });
        } catch(error) {
            expect(error).toEqual({ 'errorMessage': 'category name must be greater than 4 letters' });
        }
    })
})


