var express = require('express');
var router = express.Router();
const sgMail = require('@sendgrid/mail');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');

const eventController = require('../controllers/event');


const corsOptions = require('../middleware/cors-config');
const saveProduct = require('../middleware/save-product');
const saveEvent = require('../middleware/save-event');
const deleteEvent = require('../middleware/delete-event');
const updateCurrentEvent = require('../middleware/update-current-event');

router.use(cors(corsOptions));
//#region SendGrid Stuff
const sendMail = output => {
    sgMail.setApiKey(process.env.SG_API_KEY);
    const msg = {
        //to: 'lydiapskitchen@gmail.com',
        to: 'xcmcpx@gmail.com',
        from: 'chrispatrickcodes@gmail.com',
        subject: `Lydia's Kitchen test order email`,
        text: 'WE BALLIN',
        html: output
    }
    sgMail.send(msg);
};
//#endregion

//#region authentication routes
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
router.post('/login', async (req, res, next) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.headers.Authorization.split(' ')[1],
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();

        console.log(`User ${payload.name} Verified with google`);

        const { email } = payload;

        if(email === 'lydiapskitchen@gmail.com' || email === 'chrispatrickcodes@gmail.com'){
            console.log(`User ${payload.name} logged in to admin pages with ${email}`);
            res.send({
                msg: 'User Authenticated',
                isLoggedIn: true
            })
        } else {
            console.log(`User ${payload.name} denied access to admin pages with ${email}`);
            res.send({
                msg: 'Your google profile is not authorized to view this information. Please contact LydiasKitchen for more information.',
                isLoggedIn: false
            });
        }
    }
    catch(err) {
        console.log(err);
    }
});
//#endregion

//#region Saving routes
router.post('/import', async (req, res) => {
    const products = req.body;

    products.forEach(p => {
        saveProduct(p);
    });

    res.send({
        msg: 'Success!'
    });
});

router.post('/updateCurrentEvent', async (req, res) => {
    try {
        const id = req.body.cdata.id;
        const isCurrentEvent = req.body.cdata.isCurrentEvent;
        const updatedEvent = await updateCurrentEvent(id, isCurrentEvent);
        res.status(200).send({
            msg: 'Updating event success',
            uE: updatedEvent
        })
    }
    catch (err) {
        res.send({
            msg: 'Updating event failed.'
        });
        throw err;
    }
});

router.post('/saveEvent', async (req, res) => {
    try{
        const event = req.body.cdata.event;

        const updatedEvent = await saveEvent(event);
        res.status(200).send({
            msg: 'Save Event success',
            uE: updatedEvent
        })
    } catch (err){
        res.send({
            msg: 'Save Event failed.'
        });
        throw err;
    }
});
//#endregion

//#region deletion methods
router.post('/deleteCurrentEvent', async (req, res, next) => {
    try {
        const id = req.body.cdata.id;

        const deletedEvent = await deleteEvent(id);
            res.status(200).send({
                msg: 'Deleted Event'
            });
    } catch(err){
        res.send({
            msg: 'Delete Event failed.'
        });
        throw err;
    }
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
    order.invoiceID = data.invoiceID;
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

router.post('/sendOrder', async (req, res, next) => {
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
            ${order.preferredPayment} -- invoice at: ${order.invoiceID}
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

router.get('/allEvents', async (req, res, next) => {
    try{
        const events = await eventController.getAllEvents();
        res.send({
            msg: 'Success!',
            events: events
        })
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;