const Joi = require("joi");

class userValidation {
  async register(data) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().allow(""),
    });
    const result = schema.validate(data);
    return result;
  }

  async login(data) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const result = schema.validate(data);
    return result;
  }
}

module.exports = new userValidation();
