const eventController = require('../controllers/event');

//if need do any data manipulation before saving, do here
module.exports = saveEvent =  (e) => {
    const eventToSave = {
        id: e._id ? e._id : '123456789012',
        title: e.title,
        description: e.description,
        date: e.date,
        images: e.images,
        products: e.products,
        announcement: e.announcement,
        isCurrentEvent: e.isCurrentEvent ? e.isCurrentEvent : false
    };
    eventController.saveEvent(eventToSave)
    .then((err, e) => {
        if(err)
            console.log(err);
    });
};