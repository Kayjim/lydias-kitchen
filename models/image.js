const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imgSchema = new Schema({
    name: String,
    description: String,
    imagePath: String,
    deleted: {
        default: false,
        type: Boolean
    }
});

module.exports = mongoose.model('Image', imgSchema);