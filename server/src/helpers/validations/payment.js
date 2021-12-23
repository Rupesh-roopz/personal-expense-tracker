const paymentMethodValdation = async (req) => {
    const { paymentMethodName } = req;

    if((/\d/.test(paymentMethodName)) || paymentMethodName.trim() === '' ) {
        throw ({ errorMessage : 'Please enter a valid name'});
    }

    if(paymentMethodName.trim().length < 4 || paymentMethodName.trim().length>15) {
        throw ({ errorMessage : 'payment name must be greater than 4 letters and less than 15 characters'});
    }

    return 1;
}

module.exports = { paymentMethodValdation };