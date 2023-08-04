const mongoose = require("mongoose");

// Chú ý là mỗi máy sẽ có mỗi đường dẫn để kết nối với MongoDB khác nhau.
// mongodb://<username>:<password>@localhost:27017/<database name>?authSource=admin
const MONGODB_URI = "";

const connectToMongoDB = () => {
  return mongoose.connect(MONGODB_URI);
};

module.exports = connectToMongoDB;
