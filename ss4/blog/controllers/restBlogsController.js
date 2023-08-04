const fileUtils = require("../utils/file");

const getListBlogs = async (req, res) => {
    const blogs = await fileUtils.readFileFromData("blogs.json");
    // return res.send(JSON.parse(blogs));

    // res.status(200).json(JSON.parse(blogs))
    // default status code = 200
    return res.status(200).send(JSON.parse(blogs));
};

const getBlogDetail = async (req, res) => {
    // TODO
};

const createBlog = async (req, res) => {
    // 201 - Created
    // TODO
    console.log(req.body);
};

const restBlogsControllers = {
  getListBlogs,
  getBlogDetail,
  createBlog,
};

module.exports = restBlogsControllers;
