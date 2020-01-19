const Image = require('../models/image');

module.exports = saveImage = (img) => {
    const imgToSave = new Image;
    imgToSave.url = img.url;
    imgToSave.title = img.title;
    imgToSave.save((err, i) => {
        if (err) throw err;
        console.log('saved img to mongo');
    });
};