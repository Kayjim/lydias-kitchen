var express = require('express');
var router = express.Router();
const cors = require('cors');

const corsOptions = require('../middleware/cors-config');

const eventController = require('../controllers/event');

router.use(cors(corsOptions));


router.get('/current-event', async (req, res) => {
    const event = await eventController.getCurrentEvent();
    res.send({
        msg: 'Success!',
        event: event
    });
});



module.exports = router;