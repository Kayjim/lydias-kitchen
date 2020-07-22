const handleBackClick = (activeStep, data) => {
    switch (activeStep) {
        case (0):
            break;
        case (1):
            if(data.hasOwnProperty('isCurrentEvent')){
                delete data['isCurrentEvent'];
            }
            break;
        case (2):
            resp = validateDeliveryDetails(data);
            break;
        case (3):
            resp = validatePaymentDetails(data);
            break;
        case (4):
            break;
    }
    return data;
}

export default handleBackClick;