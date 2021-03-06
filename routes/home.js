var express = require('express');
var router = express.Router();
const cors = require('cors');

const corsOptions = require('../middleware/cors-config');

const productController = require('../controllers/product');
const eventController = require('../controllers/event');

router.use(cors(corsOptions));


router.get('/all-products', async (req, res) => {
    const products = await productController.getAllProducts();
    res.send({
        msg: 'Success!',
        products: products
    });
});

router.get('/current-event', async (req, res) => {
    const event = await eventController.getCurrentEvent();
    res.send({
        msg: 'Success!',
        event: event
    });
});

module.exports = router;