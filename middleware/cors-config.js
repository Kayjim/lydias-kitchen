const cors = require('cors');

var corsOptions = {
    origin: ['http://www.chrispcodes.com', 'http://localhost:3000', 'http://localhost:4000', 'http://localhost:3004'],
    optionsSuccessStatus: 200
};

module.exports = corsOptions;