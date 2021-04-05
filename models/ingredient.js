const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name: String,
    includedIn: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
});

module.exports = mongoose.model('Ingredient', ingredientSchema);