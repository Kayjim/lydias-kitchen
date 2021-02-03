const Event = require('../models/event');
const mongoose = require('mongoose');

const { transformEvent } = require('../middleware/merge');

module.exports = {
    createEvent: async (args, req) => {

        const event = new Event({
            title: args.title,
            description: args.description,
            date: args.date,
            images: args.images,
            products: args.products,
            announcement: args.announcement,
            isCurrentEvent: args.isCurrentEvent
        });

        let createdEvent;

        try {
            const result = await event.save();

            createdEvent = transformEvent(result);

            return createdEvent;
        } catch (err) {
            console.log(err);
            throw (err);
        }
    },
    getCurrentEvent: async (args, req) => {
        try {
            const event = await Event.findOne({ isCurrentEvent: true }).populate('products');
            if (!event) {
                throw new Error('No current event!');
            }

            const transformedEvent = transformEvent(event);

            return transformedEvent;
        } catch (err) {
            throw err;
        }
    },
    updateCurrentEvent: async (args, req) => {
        try {
            // console.log(args);
            const event = await Event.findById(args.id).populate('products');
            const currentEvent = await Event.findOne({isCurrentEvent: true});
            if (!event) {
                throw new Error('No event found by that ID!');
            }
            event.isCurrentEvent = args.isCurrentEvent;
            if(currentEvent){
                currentEvent.isCurrentEvent = false;
                await currentEvent.save();
            }
            const result = await event.save();
            const transformedEvent = transformEvent(result);


            return transformedEvent;
        } 
        catch (err) {
            throw err;
        }
    },
    getAllEvents: async (args, req) => {
        try {
            let events = await Event.find().populate('products');
            return events.map(e => {
                return transformEvent(e);
            });
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    saveEvent: async (args, req) => {
        try {
            const event = await Event.findOne({_id: mongoose.Types.ObjectId(args.id)});

            if (!event) {
                const newEvent = new Event({
                    title: args.title,
                    description: args.description,
                    date: args.date,
                    images: args.images,
                    products: args.products,
                    announcement: args.announcement,
                    isCurrentEvent: args.isCurrentEvent
                });
        
                let createdEvent;
        
                try {
                    const result = await newEvent.save();
        
                    createdEvent = transformEvent(result);
        
                    return createdEvent;
                } catch (err) {
                    console.log(err);
                    throw (err);
                }
            }
            else {
                event.title = args.title;
                event.description = args.description;
                event.date = args.date;
                event.images = args.images;
                event.products = args.products;
                event.announcement = args.announcement;
                event.isCurrentEvent = args.isCurrentEvent;
                
                let updatedEvent;
                try {
                    const result = await event.save();

                    updatedEvent = transformEvent(result);

                    return updatedEvent
                }catch (err) {
                    console.log(err);
                    throw (err);
                }
            }
        } catch (err) {
            throw err;
        }
    },
    deleteEvent: async (args, req) => {
        await Event.deleteOne({_id: args}, (err) => {
            if(err) {
                console.log(err);
                return false;
            }
            return true;

        });

    }
}