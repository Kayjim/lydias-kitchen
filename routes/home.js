var express = require('express');
var router = express.Router();
const cors = require('cors');

const corsOptions = require('../middleware/cors-config');

const productController = require('../controllers/product');

router.use(cors(corsOptions));


router.get('/all-products', async (req, res) => {

    const products = await productController.getAllProducts();
    console.log(req);
    console.log('bruh');
    console.log(products);
    res.send({
        msg: 'Success!',
        products: products
    });
});

module.exports = router;