const Ingredient = require('../models/ingredient');

const { transformIngredient } = require('../middleware/merge')

module.exports = {
    getAllIngredients: async (args, req) => {
        try {
            const ingredients = await Ingredient.find();
            return ingredients.map(i => {
                return transformIngredient(i);
            });
        }
        catch(err){
            throw err;
        }
    }
}