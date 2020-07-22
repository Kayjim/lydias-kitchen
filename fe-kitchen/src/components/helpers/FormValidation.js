
const validateForms = (activeStep, data) => {
    let resp = {};
    switch (activeStep) {
        case (0):
            resp = validateContactInfo(data);
            break;
        case (1):
            resp = validateOrderType(data);
            break;
        case (2):
            resp = validateDeliveryDetails(data);
            break;
        case (3):
            break;
        case (4):
            break;
    }
    return resp;
}

const validateContactInfo = (data) => {
    let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let errorMsg = '';
    let resp = {};
    if (Object.keys(data).length === 0 || data.fName === "" || data.lName === "" || data.email === "" || data.address1 === "" || data.city === "" || data.state === "" || data.zip === "") {
        errorMsg = 'Fill out all required fields and try again.';
        resp = {
            msg: errorMsg,
            alertType: 'error',
            success: false
        }
    }
    else if (!emailReg.test(data.email)) {
        errorMsg = 'Please provide a valid email format.';
        resp = {
            msg: errorMsg,
            alertType: 'error',
            success: false
        }
    }
    else {
        resp = {
            msg: 'Success',
            alertType: 'success',
            success: true
        }
    }
    return resp;
};
const validateOrderType = (data) => {
    let resp = {};
    if(data.isCurrentEvent){
        if(!data.hasOwnProperty('oneBox') && !data.hasOwnProperty('twoBox') && !data.hasOwnProperty('threeBox') && !data.hasOwnProperty('fourBox')){
            resp = {
                msg: 'Please choose how many boxes you would like to order',
                alertType: 'error',
                success: false
            }
        }else 
        if(data.hasOwnProperty('hasSpecialRequest') && data.hasSpecialRequest === true){
            if(!data.hasOwnProperty('specialRequest') || data.specialRequest === ""){
                resp = {
                    msg: 'Please enter a special request message.',
                    alertType: 'error',
                    success: false
                }
            }
            else {
                resp = {
                    msg: 'Success',
                    alertType: 'success',
                    success: true
                }
            }
        } else {
            resp = {
                msg: 'Success',
                alertType: 'success',
                success: true
            }
        }
    }else{
        console.log('made it to spec request validate')
    }
    return resp;
};
const validateDeliveryDetails = (data) => {
    let resp = {};
    if(!data.hasOwnProperty('delivery') && !data.hasOwnProperty('pickup')){
        resp = {
            msg: 'Please choose an option.',
            alertType: 'error',
            success: false
        }
    }
    else if(data.hasOwnProperty('diffAddy')){
        debugger;
        if(!data.hasOwnProperty('diffAddress1') || data.diffAddress1 === "" || !data.hasOwnProperty('diffCity') ||  data.diffCity === "" || !data.hasOwnProperty('diffState') ||  data.diffState === "" || !data.hasOwnProperty('diffZip') ||  data.diffZip === ""){
            resp = {
                msg: 'Please enter address details.',
                alertType: 'error',
                success: false
            }
        }else {
            resp = {
                msg: 'Success',
                alertType: 'success',
                success: true
            }
        }
    }
    else {
        resp = {
            msg: 'Success',
            alertType: 'success',
            success: true
        }
    }
    return resp;
};

export default validateForms;