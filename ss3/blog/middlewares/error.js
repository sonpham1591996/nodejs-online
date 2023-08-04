const handleError = (err, req, res, next) => {
  return res.render("500.ejs");
};

module.exports = handleError;
