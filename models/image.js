const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imgSchema = new Schema({
    title: String,
    url: String,
    description: String,
    ingredients: [
            {
                name: String,
                value: String,
        }
    ],
    deleted: {
        default: false,
        type: Boolean
    }
});

module.exports = mongoose.model('Image', imgSchema);