const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    contactnumber: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    referer: {
        type: String,
        require: false
    },
    product_keys: [
        {
            type: String,
            require: true
        }
    ]
});

module.exports = mongoose.model('Order', orderSchema);