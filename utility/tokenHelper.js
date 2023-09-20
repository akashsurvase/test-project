var jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports.generateToken = function (obj) {
  return jwt.sign({ obj }, process.env.secretKey);
};

module.exports.validateToken = function (token) {
  return jwt.verify(token, process.env.secretKey);
};
