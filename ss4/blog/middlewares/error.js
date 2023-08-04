const handleError = (err, req, res, next) => {
  console.log(err);
  return res.render("500.ejs");
};

module.exports = handleError;
