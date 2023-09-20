const tokenhelper = require("../utility/tokenHelper");

let errorMsg = null;
module.exports.AuthGuard = function (role = [1]) {
  return async function (req, res, next) {
    try {
      const token = req.headers["x-access-token"];
      if (!token) {
        errorMsg = "Unathorized Access";
        return res.status(401).send(errorMsg);
      }
      var firstDecrypt = tokenhelper.validateToken(token);

      if (firstDecrypt) {
        req.user = firstDecrypt.obj;
        next();
      } else {
        errorMsg = "Invalid Token";
        return res.status(400).send(errorMsg);
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  };
};
