const productController = require('../controllers/product');

module.exports = saveProduct = (p) => {
    const ingredients = p.ingredients.split(', ');
    const imgs = p.images.split(', ');
    const title = p.title;
    const description = p.description;
    const type = p.type;
    const level = p.level ? p.level : 2;
    let price = 0;
    switch(type){
        case ('Cake'):
            price = 30;
            break;
        default:
            price = 10;
            break;
    }

    productController.createProduct({ title, description, price, type, level, imgs, ingredients})
    .then((err, p) => {
        if(err)
            console.log(err);
    });
};