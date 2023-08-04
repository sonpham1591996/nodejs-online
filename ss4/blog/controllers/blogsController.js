const BlogsModel = require("../model/blogsModel");
const fileUtils = require("../utils/file");

const getListBlogs = async (req, res) => {
  try {
    // const blogs = await fileUtils.readFileFromData("blogs.json"); // string
    // res.render("blogs/list.ejs", { blogs: JSON.parse(blogs) });

    // Get data from MongoDB
    const blogs = await BlogsModel.find(); // find all
    // console.log(JSON.stringify(blogs));
    res.render("blogs/list.ejs", { blogs });
  } catch (err) {
    res.render("500.ejs");
  }
};

const getBlogDetail = async (req, res) => {
  console.log("GET BLOG DETAIL");
  const id = req.params.id;
  if (!id || isNaN(id)) {
    return res.render("400.ejs", { msg: "Invalid id" });
  }

  try {
    const blogs = await fileUtils.readFileFromData("blogs.json");
    const blog = JSON.parse(blogs).filter((b) => b.id === +id)[0];
    if (!blog) {
      return res.render("400.ejs", { msg: "Not found blog" });
    }

    res.render("blogs/detail.ejs", { blog });
  } catch (err) {
    res.render("500.ejs");
  }
};

const getCreationForm = (req, res) => {
  res.render("blogs/creationForm.ejs", { errorMsg: undefined });
};

const createBlog = async (req, res) => {
  const body = req.body;
  try {
    // Read-Write file
    // let blogs = await fileUtils.readFileFromData("blogs.json");
    // blogs = JSON.parse(blogs);
    // blogs.push({
    //   id: blogs.length + 1,
    //   ...body,
    // });
    // // Write du lieu
    // await fileUtils.writeFileFromData("blogs.json", JSON.stringify(blogs));

    // Insert data to MongoDB
    try {
      await BlogsModel.create(body);
      res.writeHead(302, {
        Location: "/blogs/list",
      });
      return res.end();
    } catch (error) {
      return res.render("400.ejs");
    }
  } catch (err) {
    console.log(err);
    return res.render("500.ejs");
  }
};

const updateBlog = async (req, res) => {
  const body = req.body;
  try {
    // Read-Write file
    // let blogs = await fileUtils.readFileFromData("blogs.json");
    // blogs = JSON.parse(blogs);
    // blogs.push({
    //   id: blogs.length + 1,
    //   ...body,
    // });
    // // Write du lieu
    // await fileUtils.writeFileFromData("blogs.json", JSON.stringify(blogs));

    // Insert data to MongoDB
    try {
      await BlogsModel.findByIdAndUpdate(body.id, body);
      res.writeHead(302, {
        Location: "/blogs/list",
      });
      return res.end();
    } catch (error) {
      console.log(error);
      return res.render("400.ejs");
    }
  } catch (err) {
    res.render("500.ejs");
  }
};

const getUpdateForm = async (req, res) => {
  const id = req.params.id;

  // TODO Validation
  try {
    const blog = await BlogsModel.findById(id);
    return res.render("blogs/updateForm.ejs", { blog });
  } catch (error) {
    return res.render("400.ejs");
  }
};

const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    await BlogsModel.findByIdAndDelete(id);
    res.writeHead(302, {
      Location: "/blogs/list",
    });
    return res.end();
  } catch (error) {
    return res.render("400.ejs");
  }
}

const blogsControllers = {
  getListBlogs,
  getBlogDetail,
  getCreationForm,
  getUpdateForm,
  createBlog,
  updateBlog,
  deleteBlog
};

module.exports = blogsControllers;
