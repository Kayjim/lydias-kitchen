var express = require('express');
var router = express.Router();
const sgMail = require('@sendgrid/mail');
const cors = require('cors');

const corsOptions = require('../middleware/cors-config');
const saveProduct = require('../middleware/save-product');

router.use(cors(corsOptions));

const sendMail = output => {
    sgMail.setApiKey(process.env.SG_API_KEY);
    const msg = {
        to: 'chrispatrickcodes@gmail.com',
        from: 'xcmcpx@gmail.com',
        subject: `Lydia's Kitchen test order email`,
        text: 'WE BALLIN',
        html: output
    }
    sgMail.send(msg);
};


router.post('/import', async (req, res) => {
    const products = req.body;

    products.forEach(p => {
        saveProduct(p);
    });

    res.send({
        msg: 'Success!'
    });
});

router.post('/sendOrder', async (req, res) => {
    const mapCart = () => {
        return (
            '<ul>' +
                req.body.cart.map(p => {
                    '<li>' + p.title + '</li>'
                    })
                    +
            '</ul>'
        );
    };
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
        <ul>
        <h4>Order Details</h4>
        ${mapCart}
    `
    sendMail(output);
    res.send('Mail sent');
});

module.exports = router;