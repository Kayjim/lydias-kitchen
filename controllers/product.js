const Product = require('../models/product');

const { transformProduct } = require('../middleware/merge')

module.exports = {
    createProduct: async (args, req) => {
        
        const product = new Product({
            title: args.title,
            description: args.description,
            type: args.type,
            price: args.price,
            ingredients: args.ingredients,
            images: args.imgs
        });

        let createdProduct;

        try{
            const result = await product.save();

            createdProduct = transformProduct(result);

            return createdProduct;
        } catch(err){
            console.log(err);
            throw(err);
        }
    },
}