const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    user: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    deleteAt: Date
});

module.exports = mongoose.model('Session', sessionSchema);