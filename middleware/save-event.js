const Event = require('../models/event');
const eventController = require('../controllers/event');

//if need do any data manipulation before saving, do here
module.exports = saveEvent =  (e) => {
    const eventToSave = new Event({
        title: e.title,
        description: e.description,
        date: e.date,
        images: e.images,
        products: e.products,
        ctas: e.ctas,
        discounts: e.discounts,
        location: e.location,
    });
    eventController.createEvent(eventToSave)
    .then((err, e) => {
        if(err)
            console.log(err);
    });
};