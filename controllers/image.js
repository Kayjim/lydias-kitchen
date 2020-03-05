const Image = require('../models/image');

const { transformImage } = require('../middleware/merge');

module.exports = {
    createImage: async (args, req) => {
        const image = new Image({
            url: args.url
        });
        let createdImage;
        try{
            const result = await image.save();
            createdImage = transformImage(result);
            return createdImage;
        }
        catch(err) {
            console.log(err);
            throw err;
        }
    }
}