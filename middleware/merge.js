const DataLoader = require('dataloader');

const Product = require('../models/product');
const Event = require('../models/event');

//#region Loaders
const productsLoader = new DataLoader( productIds => {
    return products(productIds);
});

const productLoader = new DataLoader( id => {
    return Product.find({_id: {$in: id} });
});

const eventsLoader = new DataLoader( eventIds => {
    return events(eventIds);
});

const eventLoader = new DataLoader( id => {
    return Event.find({_id: {$in: id} });
});
//#endregion

//#region helpers
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
};

const product = async productId => {
    try {
        const product = await productLoader.load(productId.toString());
        return {
            ...product._doc,
            _id: product.id,
            images: () => imagesLoader.loadMany(product._doc.images),
        };
    } 
    catch(err){
        throw err;
    }
};

const events = async eventIds => {
    try{
        const events = await Event.find ({_id: { $in: eventIds } });
        events.sort((a, b) => {
            return (
                eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
            );
        });
        return events.map(e => {
            return transformEvent(e);
        }) 
        } catch(err){
            throw(err);
    }
};
const event = async eventId => {
    try{
        const event = await eventLoader.load(eventId.toString());
        return {
            ...event._doc,
            _id: event.id,
            products: () => productsLoader.loadMany(event._doc.products),
        };
    } catch(err) {
        throw err;
    }
};
//#endregion

//#region Transform Methods
const transformProduct = prd => {
    return {
        ...prd._doc,
        _id: prd._id,
        images: prd.images
    }
};

const transformEvent = e => {
    return {
        ...e._doc,
        _id: e._id,
        products: e.products,
        images: e.images
    }
}
//#endregion

exports.transformProduct = transformProduct;
exports.transformEvent = transformEvent;