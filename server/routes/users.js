const express = require("express");
const usersController = require("../controllers/usersController");
const api = express.Router();
const md_auth = require("../middlewares/authenticated");

api.get("/getUsers", md_auth.ensureAuth, usersController.getUsers);
// api.get("/getUsers", usersController.getUsers);


module.exports = api;
