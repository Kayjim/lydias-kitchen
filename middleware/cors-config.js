const cors = require('cors');

var corsOptions = {
    origin: [
        "http://www.lydiaskitchen.net",
        "https://lydias-kitchen.herokuapp.com",
        "lydias-kitchen.herokuapp.com",
        "http://localhost:3000",
        "http://localhost:4000",
        "http://localhost:3004"
      ],
    optionsSuccessStatus: 200
};

module.exports = corsOptions;