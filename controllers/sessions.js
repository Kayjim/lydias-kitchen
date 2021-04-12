const bcrypt = require('bcrypt');
const Session = require('../models/sessions');
const add = require('date-fns/add');

module.exports = {
    createSession: async (args, req) => {
        let newDate = new Date();
        let deleteAt = add(newDate, {minutes: args.expires});
        const session = new Session({
            user: args.user,
            deleteAt: deleteAt
        });

        let createdSession;
        let isSupperDifferentThanDinner;

        try {
            const result = await session.save();

            createdSession = result;
            const input = createdSession._id;
            bcrypt.genSalt(8, (err, salt) => {
                bcrypt.hash(input, salt, (err, hash) => {
                    isSupperDifferentThanDinner = hash;
                });
            });
            return {
                createdSession: createdSession,
                isSupperDifferentThanDinner: isSupperDifferentThanDinner
            };
        } catch (err) {
            console.log(err);
            throw (err);
        }
    },
    getAllSessions: async (args, req) => {
        try {
            const sessions = await Session.find();
            return sessions;
        }
        catch (err) {
            throw err;
        }
    },
    updateProduct: async (args, req) => {
        try {
            return "hit update product";

        } catch (e) {
            throw (e)
        }
    }
}