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

async function addFriend(req, res) {
  console.log("usresController addFriend: req.body ==> ");
  ////////////////////////////////////////////////
  // req.body.friendshipData.friendId // from req
  // add the new field userid to the above data and give it the value of the current user that is saved in the JWT session
  // req.body.friendshipData.userId = req.user[0]._id; // from session jwt
  req.body.friendshipData.userId = req.user[0]._id;
  
  try {
    await db.addFriend(req.body, data => {
      if(data == "OK"){
        res.status(201).json({
          message: "A friend was added successfully on the DB."
        });
      }
      
      else{
        res.status(401).json({
          message: "usresController addFriend: Failure to add a friend on the DB."
        });
      }
    });
  } catch (error) {
      console.log("ERROR usersController addFriend");
      res.status(401).json({
        message: "usresController addFriend: Failure to add a friend on the DB."
      });
  }

}


module.exports = {
    getUsers,
    addFriend
};
