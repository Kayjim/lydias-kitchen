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

router.post('/createEvent', async(req, res) => {
    const event = req.cdata.event;
    try{
        saveEvent(event);
    } 
    catch (err){
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

const mapCart = (cart) => {
    let cartList = '';
    cartList = cart.map(c => {
        return cartList + `<li>${c.title}</li>`
    });
    return cartList
};

router.post('/sendOrder', async (req, res) => {
    const output = `
        <h3>You have a new order from Lydia's Kitchen!</h3>
        <h4>Contact Details</h4>
        <ul>
            <li>Name: ${req.body.firstName} ${req.body.lastName}</li>
            <li>Email: ${req.body.email}</li>
            <li>(Phone): ${req.body.phone}</li>
            <li>Address 1: ${req.body.address1}</li>
            <li>Address 2: ${req.body.address2}</li>
            <li>City: ${req.body.city}</li>
            <li>State: ${req.body.state}</li>
            <li>Zip: ${req.body.zip}</li>
        </ul>
        <h4>Order Details</h4>
        <ul>
        ${mapCart(req.body.cart).toString().replace(/,/g, '')}
        </ul>
        <h4>TOTAL</h4>
        <p>$${req.body.total}</p>
    `
    sendMail(output);
    res.send('Mail sent');
});


module.exports = router;