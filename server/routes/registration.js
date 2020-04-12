var express = require('express');
var registrationController = require('../controllers/registrationController');
const md_auth = require("../middlewares/authenticated");
const multer = require("../services/multerService"); 

var api = express.Router();

api.post("/register", [md_auth.ensureAuth, multer.single("image")], registrationController.register);
api.post("/login", md_auth.ensureAuth, registrationController.login);
api.patch("/verifyAccount", md_auth.ensureAuth, registrationController.verifyAccount);
api.patch("/forgotPassword", md_auth.ensureAuth, registrationController.forgotPassword);

module.exports = api;


