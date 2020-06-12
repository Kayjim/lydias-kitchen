var express = require('express');
var router = express.Router();
const cors = require('cors');

const corsOptions = require('../middleware/cors-config');

const productController = require('../controllers/product');

router.use(cors(corsOptions));


router.get('/all-products', async (req, res) => {
    console.log(req.protocol);
    const products = await productController.getAllProducts();
    res.send({
        msg: 'Success!',
        products: products
    });
});

module.exports = router;