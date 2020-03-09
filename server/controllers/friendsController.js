const db = require("../repository/dbmaneger");

function getFriends(req, res) {
  try {
    db.getFriends(friends => {
      res.status(201).json(friends? friends : []);
    });
  } catch (error) {
    console.log("getFriends ==> " + error);
    res.status(401).json({
      message: "Failure, try again"
    });
  }
}

module.exports = {
    getFriends
};
