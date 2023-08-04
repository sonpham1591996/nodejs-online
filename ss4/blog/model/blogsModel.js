const mongoose = require("mongoose");
// Tao Schema
const blogsSchema = mongoose.Schema({
  // _id:  string | mongoose.SchemaTypes.ObjectId
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
});
// Tao Model
const BlogsModel = mongoose.model("blogs", blogsSchema);

module.exports = BlogsModel;
