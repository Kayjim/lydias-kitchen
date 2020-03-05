var express = require('express');
var router = express.Router();
const cors = require('cors');

const corsOptions = require('../middleware/cors-config');
const saveProduct = require('../middleware/save-product');

router.use(cors(corsOptions));


router.post('/import', async (req, res) => {
    const products = req.body;

    products.forEach(p => {
        saveProduct(p);
    });

    res.send({
        msg: 'Success!'
    });
});

module.exports = router;