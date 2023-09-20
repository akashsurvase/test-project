const apiController = require("../utility/apiController");
const sqlCmds = require("../utility/sqlcmds");
const userValidation = require("../validations/user.validation");
const tokenHelper = require("../utility/tokenHelper");
const bcrypt = require("bcrypt");
class User {
  async register(data) {
    try {
      const { error } = await userValidation.register(data);
      if (error) {
        return apiController.respondBad(error.message);
      }
      let { name, email, password } = data;
      const bcryptedPassword = await bcrypt.hash(password, 5);
      const findUserSql = `select email from users where email = '${email}'`;
      const isUserExist = await sqlCmds.getOne(findUserSql);

      if (isUserExist) {
        return apiController.respondBad({
          message: "User Already exist.",
        });
      }
      const sql = `INSERT INTO users (name, email, password) VALUES (?,?,?)`;
      const registeredData = await sqlCmds.addRecords(sql, [
        name,
        email,
        bcryptedPassword,
      ]);
      return apiController.respondPost(registeredData);
    } catch (err) {
      return apiController.respondBad(err);
    }
  }

  async login(data) {
    try {
      let { email, password } = data;
      let { error } = await userValidation.login(data);
      if (error) {
        return apiController.respondBad(error.message);
      }
      const findUserSql = `select id,email,password,name from users where email = '${email}'`;
      const isUserExist = await sqlCmds.getOne(findUserSql);
      if (!isUserExist) {
        return apiController.respondBad("The email id does not exist.");
      }

      const validPassword = bcrypt.compareSync(password, isUserExist.password);
      if (!validPassword)
        return apiController.respondBad(
          "Incorrect password, please enter correct password"
        );
      const encrypted = tokenHelper.generateToken({
        id: isUserExist.id,
        email: email,
        name: isUserExist.name,
      });

      return apiController.respondGet({
        token: encrypted,
      });
    } catch (err) {
      return apiController.respondError(err);
    }
  }
}
module.exports = new User();
