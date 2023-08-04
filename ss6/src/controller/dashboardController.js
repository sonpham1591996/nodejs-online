const getDashboardPage = (req, res) => {
  return res.status(200).json({ message: "Dashboard page" });
};

const getStudents = (req, res) => {
  return res.status(200).json({ students: [{ id: 1, name: "SonPM" }] });
};

module.exports = {
  getDashboardPage,
  getStudents
};
