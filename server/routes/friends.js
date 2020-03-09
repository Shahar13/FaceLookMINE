const express = require("express");
const friendsController = require("../controllers/friendsController");
const api = express.Router();
const md_auth = require("../middlewares/authenticated");

api.get("/getFriends", md_auth.ensureAuth, friendsController.getFriends);
// api.get("/getFriends", friendsController.getFriends);


module.exports = api;
