const mongoose = require('mongoose');
const productSchema = require('./product').schema;


const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: String,
    description: String,
    date: Date,
    images: [String],
    products: [productSchema],
    ctas: [String],
    discounts: [String],
    location: [String],
});

module.exports = mongoose.model('Event', eventSchema);