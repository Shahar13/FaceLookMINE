var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "Secret_Key1-2-3.";

exports.ensureAuth = function(req, res, next) {
  console.log("ensureAuth call()");
  console.log(req.body);

  if (!req.headers.authorization) {
    return res.status(403).send({ message: "Auth failed" });
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    var payload = jwt.decode(token, secret);

    if (payload.expired <= moment().unix()) {
      return res.status(401).send({ message: "Expired Token." });
    }
  } catch (ex) {
    console.log("authenticated.js: ex ==>");
    console.log(ex);
    
    
    return res.status(403).send({ message: "Forbidden: Invalid Token..." });
  }
  req.user = payload;

  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  // console.log("AUTH.JS: req.user ==>");
  // console.log(req.user[0]._id);
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  

  next();
};
