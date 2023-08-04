const handleNotFoundPage = (req, res, next) => {
  return res.render("404.ejs");
};

module.exports = handleNotFoundPage;
