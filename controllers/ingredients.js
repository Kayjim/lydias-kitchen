const Ingredient = require('../models/ingredient');

const { transformIngredient } = require('../middleware/merge')

module.exports = {
    getAllIngredients: async (args, req) => {
        try {
            const ingredients = await Ingredient.find().populate('includedIn');
            return ingredients.map(i => {
                return transformIngredient(i);
            });
        }
        catch(err){
            throw err;
        }
    },
    updateIngredient: async(args, req) => {
        try {
            const foundIngredient = await Ingredient.findOne({ _id: args.id });
            const updatedIngredient = args.updatedIngredient;
            if (!foundIngredient) {
                throw new Error('No ingredient found by that name!');
            }

            foundIngredient.name = updatedIngredient.name;
            foundIngredient.includedIn = updatedIngredient.includedIn;

            const saved = await foundIngredient.save();

            if (!saved) {
                throw new Error('Ingredient could not save');
            }
            const result = transformIngredient(saved);
            return result;

        } catch (e) {
            throw (e)
        }
    }
}