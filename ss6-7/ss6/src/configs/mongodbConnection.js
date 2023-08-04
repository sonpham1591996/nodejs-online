const mongoose = require('mongoose');

module.exports = connectToMongoDB = (mongoDbURI) => {
    return mongoose.connect(mongoDbURI);
}