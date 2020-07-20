const Event = require('../models/event');

const { transformEvent } = require('../middleware/merge')

module.exports = {
    createEvent: async (args, req) => {
        
        const event = new Event({
            title: args.title,
            description: args.description,
            date: args.date,
            images: args.images,
            products: args.products,
            ctas: args.ctas,
            discounts: args.discounts,
            location: args.location,
        });

        let createdEvent;

        try{
            const result = await event.save();

            createdEvent = transformEvent(result);

            return createdEvent;
        } catch(err){
            console.log(err);
            throw(err);
        }
    },
    getAllEvents: async (args, req) => {
        try {
            const events = await Event.find();
            return events.map(e => {
                return transformEvent(e);
            });
        }
        catch(err){
            throw err;
        }
    }
}