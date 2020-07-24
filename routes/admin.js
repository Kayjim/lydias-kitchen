var express = require('express');
var router = express.Router();
const sgMail = require('@sendgrid/mail');
const cors = require('cors');

const corsOptions = require('../middleware/cors-config');
const saveProduct = require('../middleware/save-product');
const saveEvent = require('../middleware/save-event');

router.use(cors(corsOptions));
//#region SendGrid Stuff
const sendMail = output => {
    sgMail.setApiKey(process.env.SG_API_KEY);
    const msg = {
        to: 'lydiapskitchen@gmail.com',
        from: 'chrispatrickcodes@gmail.com',
        subject: `Lydia's Kitchen test order email`,
        text: 'WE BALLIN',
        html: output
    }
    sgMail.send(msg);
};
//#endregion

//#region Saving Methods
router.post('/import', async (req, res) => {
    const products = req.body;

    products.forEach(p => {
        saveProduct(p);
    });

    res.send({
        msg: 'Success!'
    });
});

router.post('/createEvent', async (req, res) => {
    const event = req.cdata.event;
    try {
        saveEvent(event);
    }
    catch (err) {
        res.send({
            msg: 'Create Event failed.'
        });
        throw err;
    }

    res.send({
        msg: 'Event Created'
    })

});
//#endregion

//#region Helper Methods
const buildOrder = data => {
    let order = {};
    order.firstName = data.fname;
    order.lastName = data.lname;
    order.email = data.email;
    order.phone = data.phone;
    order.address1 = data.address1;
    order.address2 = data.address2 ? data.address2 : '';
    order.city = data.city;
    order.state = data.state;
    order.zip = data.zip;
    order.diffAddress1 = data.diffAddress1 ? data.diffAddress1 : order.address1;
    order.diffAddress2 = data.diffAddress2 ? data.diffAddress2 : order.address2;
    order.diffCity = data.diffCity ? data.diffCity : order.city;
    order.diffState = data.diffState ? data.diffState : order.state;
    order.diffZip = data.diffZip ? data.diffZip : order.zip;
    order.preferredPayment = data.zelle ? 'Zelle' : data.paypal ? 'Paypal' : data.venmo ? 'Venmo' : 'Cash on Delivery';
    order.specReq = data.specialRequest ? data.specialRequest : 'N/A';
    if (data.isCurrentEvent) {
        order.numBoxes = data.oneBox ? '1 box' : data.twoBox ? '2 boxes' : data.threeBox ? '3 boxes' : data.fourBox ? '4 boxes' : false;
    }
    order.isCurrentEvent = data.isCurrentEvent;
    order.hasSpecialRequest = data.hasSpecialRequest;
    order.diffAddy = data.diffAddy;
    order.delivery = data.delivery ? 'Delivery' : 'Pickup';
    return order;
};
//#endregion

router.post('/sendOrder', async (req, res) => {
    try {
        const order = buildOrder(req.body.data);
        let output = `
        <h3>You have a new order from Lydia's Kitchen!</h3>
        <h4>Contact Details</h4>
        <ul>
            <li>Name: ${order.firstName} ${order.lastName}</li>
            <li>Email: ${order.email}</li>
            <li>(Phone): ${order.phone}</li>
            <li>Address 1: ${order.address1}</li>
            <li>Address 2: ${order.address2}</li>
            <li>City: ${order.city}</li>
            <li>State: ${order.state}</li>
            <li>Zip: ${order.zip}</li>
        </ul>
        <h4>Order Details</h4>
        <p>This order was set for <strong>${order.delivery}</strong></p>
        `;
        if (order.numBoxes) {
            output += `<p>${order.numBoxes}</p>`
        } else {
            output += `<p>${order.specReq}</p>`
        }
        if (order.diffAddy) {
            output += `<h4>Delivery Details</h4>
        <ul>
            <li>Address 1: ${order.diffAddress1}</li>
            <li>Address 2: ${order.diffAddress2}</li>
            <li>City: ${order.diffCity}</li>
            <li>State: ${order.diffState}</li>
            <li>Zip: ${order.diffZip}</li>
        </ul>`;
        }
        output += `
        <h4>Payment Details</h4>
        <p>
            ${order.preferredPayment}
        </p>
        `
        if (order.isCurrentEvent && order.hasSpecialRequest) {
            output += `<h4>Special Request</h4>
                   <p>${order.specReq}</p>`
        }
        sendMail(output);
    }
    catch (err) {
        console.log(err);
    }
    res.send('Mail sent');
});


module.exports = router;