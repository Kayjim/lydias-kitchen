const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imgSchema = new Schema({
    url: String,
    deleted: {
        default: false,
        type: Boolean
    }
});

module.exports = mongoose.model('Image', imgSchema);