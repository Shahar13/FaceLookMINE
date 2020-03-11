const db = require("../repository/dbmaneger");

function getUsers(req, res) {
  try {
    db.getUsers(users => {
      res.status(201).json(users? users : []);
    });
  } catch (error) {
    console.log("getUsers ==> " + error);
    res.status(401).json({
      message: "Failure, try again"
    });
  }
}

module.exports = {
    getUsers
};
