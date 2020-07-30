const Event = require('../models/event');
const eventController = require('../controllers/event');

//if need do any data manipulation before saving, do here
module.exports = deleteEvent = async (id) => {
    const deletedEvent = await eventController.deleteEvent(id);
};