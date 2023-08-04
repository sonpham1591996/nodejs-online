const fileUtils = require("../utils/file");

const getListBlogs = async (req, res) => {
  try {
    const blogs = await fileUtils.readFileFromData("blogs.json"); // string
    res.render("blogs/list.ejs", { blogs: JSON.parse(blogs) });
  } catch (err) {
    res.render("500.ejs");
  }
};

const getBlogDetail = async (req, res) => {
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
  res.render("blogs/creationForm.ejs", {errorMsg: undefined});
};

const createBlog = async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    let blogs = await fileUtils.readFileFromData("blogs.json");
    blogs = JSON.parse(blogs);
    blogs.push({
      id: blogs.length + 1,
      ...body,
    });
    // Write du lieu
    await fileUtils.writeFileFromData("blogs.json", JSON.stringify(blogs));
    res.writeHead(302, {
      Location: "/blogs/list",
    });
    return res.end();
  } catch (err) {
    console.log(err);
    res.render("500.ejs");
  }
};

const blogsControllers = {
  getListBlogs,
  getBlogDetail,
  getCreationForm,
  createBlog,
};

module.exports = blogsControllers;
