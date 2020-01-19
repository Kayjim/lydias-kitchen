const fs = require('fs');
const Image = require('../models/image');

module.exports = saveImage = (imgPath) => {
    const imgToSave = new Image;
    imgToSave.img.data = fs.readFileSync(imgPath)
    imgToSave.img.contentType = 'image/png';
    imgToSave.save((err, i) => {
        if (err) throw err;

        console.error('saved img to mongo');
    });
};