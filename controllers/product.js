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
            images: args.imgs,
            level: args.level
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
    getAllProducts: async (args, req) => {
        try {
            const products = await Product.find();
            return products.map(p => {
                return transformProduct(p);
            });
        }
        catch(err){
            throw err;
        }
    },
    updateImagesForProduct: async (args, req) => {
        try{
            const foundProduct = await Product.findOne({title: args.title});
            if(!foundProduct){
                throw new Error('No product found by that name!');
            }
            let currentImages = foundProduct.images;
            currentImages.concat(args.newImages);
            foundProduct.images = currentImages;
            const result = await foundProduct.save();
            if(!result) {
                return false;
            }
            return true;
        }
        catch(err) {
            throw(err);
        }
    }
}