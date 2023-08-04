
const getDashboardPage = (req, res) => {
  return res.render("dashboard.ejs");
};

module.exports = {
  getDashboardPage,
};
