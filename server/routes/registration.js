var express = require('express');
var registrationController = require('../controllers/registrationController');
const md_auth = require("../middlewares/authenticated");
const multer = require("../services/multerService"); 

var api = express.Router();

api.post("/register", multer.single("image"), registrationController.register);
api.post("/login", registrationController.login);
api.patch("/verifyAccount", registrationController.verifyAccount);
api.patch("/forgotPassword", registrationController.forgotPassword);

module.exports = api;


