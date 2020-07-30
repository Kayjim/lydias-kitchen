const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: String,
    description: String,
    date: Date,
    images: [String],
    products: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Product'
        }
    ],
    announcement: String,
    isCurrentEvent: Boolean
});

module.exports = mongoose.model('Event', eventSchema);