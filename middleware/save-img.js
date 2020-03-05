const Image = require('../models/image');

module.exports = saveImage = async (url) => {
    const imgToSave = new Image;
    imgToSave.url = url;
    imgToSave.save((err, i) => {
        if (err) throw err;
        console.log('saved img to mongo');
        return i;
    });
};