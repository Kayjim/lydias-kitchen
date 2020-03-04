const Image = require('../models/image');

module.exports = saveImage = (img) => {
    const imgToSave = new Image;
    const ingredients = img.ingredients.split(', ');
    console.log(ingredients);
    imgToSave.url = img.url;
    imgToSave.title = img.title;
    imgToSave.description = img.description;
    imgToSave.ingredients = ingredients;
    imgToSave.save((err, i) => {
        if (err) throw err;
        console.log('saved img to mongo');
    });
};