const DataLoader = require('dataloader');

const Product = require('../models/product');


const productsLoader = new DataLoader( productIds => {
    return products(productIds);
});

const productLoader = new DataLoader( id => {
    return Product.find({_id: {$in: id} });
});

const products = async productsIds => {
    try{
        const products = await Product.find({ _id: { $in: productsIds} });
        products.sort((a, b) => {
            return (
                productsIds.indexOf(a._id.toString()) - productIds.indexOf(b._id.toString())
            );
        });
        return products.map(p => {
            return transformProduct(p);
        });
    } catch(err) {
        throw(err);
    }
}

const product = async productId => {
    try {
        const product = await productLoader.load(productId.toString());
        return {
            ...product._doc,
            _id: product.id,
            images: () => iamgesLoader.loadMany(product._doc.images),
        };
    } 
    catch(err){
        throw err;
    }
};

const transformProduct = prd => {
    return {
        ...prd._doc,
        _id: prd._id,
        images: prd.images
    }
}


exports.transformProduct = transformProduct;