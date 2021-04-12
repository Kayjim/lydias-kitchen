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
            level: args.level
        });

        let createdProduct;

        try {
            const result = await product.save();

            createdProduct = transformProduct(result);

            return createdProduct;
        } catch (err) {
            console.log(err);
            throw (err);
        }
    },
    getAllProducts: async (args, req) => {
        try {
            const products = await Product.find().populate('ingredients');
            return products.map(p => {
                return transformProduct(p);
            });
        }
        catch (err) {
            throw err;
        }
    },
    updateImagesForProduct: async (args, req) => {
        try {
            const foundProduct = await Product.findOne({ title: args.title });
            if (!foundProduct) {
                throw new Error('No product found by that name!');
            }
            let currentImages = Array.from(foundProduct.images);
            args.newImages.forEach(i => {
                currentImages.push(i);
            });
            foundProduct.images = currentImages;
            const result = await foundProduct.save();
            if (!result) {
                return false;
            }
            return true;
        }
        catch (err) {
            throw (err);
        }
    },
    getProduct: async (args, req) => {
        try {
            const foundProduct = await Product.findOne({ _id: args.id }).populate('ingredients');
            if (!foundProduct) {
                throw new Error('No product found by that name!');
            }
            const result = transformProduct(foundProduct);
            return result;
        }
        catch (err) {
            throw (err);
        }
    },
    updateProduct: async (args, req) => {
        try {
            const foundProduct = await Product.findOne({ _id: args.id });
            const updatedProduct = args.updatedProduct;
            if (!foundProduct) {
                throw new Error('No product found by that name!');
            }

            foundProduct.title = updatedProduct.title;
            foundProduct.description = updatedProduct.description;
            foundProduct.ingredients = updatedProduct.ingredients;
            foundProduct.type = updatedProduct.type;

            const saved = await foundProduct.save();

            if (!saved) {
                throw new Error('Product could not save');
            }
            const result = transformProduct(saved);
            return result;

        } catch (e) {
            throw (e)
        }
    },
    deleteProduct: async (args, req) => {
        try {
            await Product.deleteOne({_id: args}).catch(err => {
                console.log(err);
                return false;
            });
            return true;
        } catch(e) {
            throw (e)
        }
    }
}