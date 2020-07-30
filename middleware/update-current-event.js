const Event = require('../models/event');
const eventController = require('../controllers/event');

//if need do any data manipulation before saving, do here
module.exports = updateCurrentEvent = async (id, isCurrentEvent) => {
    try{
        const updatedEvent = await eventController.updateCurrentEvent({id, isCurrentEvent});
        if(!updatedEvent){
            throw new Error('Uh oh');
        }
        return updatedEvent;
    } catch(err){
        throw err;
    }
};