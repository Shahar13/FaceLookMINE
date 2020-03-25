const express = require("express");
const commentsController = require("../controllers/commentsController");
const api = express.Router();
const md_auth = require("../middlewares/authenticated");

// api.get("/getComments/:params", md_auth.ensureAuth, commentsController.getUsers);
api.get("/getComments/:params", commentsController.getComments);
// api.get("/getComments/:params", function(req, res) {
//     console.log("************ /getComments/:someone ==> ");
//     var username = req.params;
//     console.log(username);
// }); 

api.post("/addComment", md_auth.ensureAuth, commentsController.addComment);
// api.get("/getUsers", usersController.getUsers);


module.exports = api;
