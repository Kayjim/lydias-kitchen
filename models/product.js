const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: String,
    description: String,
    ingredients: [],
    price: Number,
    type: String,
    images: [String],
    onSale: {
        default: false,
        type: Boolean
    },
    offered: {
        default: true,
        type: Boolean
    },
    deleted: {
        default: false,
        type: Boolean
    }
});

module.exports = mongoose.model('Product', productSchema);