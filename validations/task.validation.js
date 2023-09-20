const Joi = require("joi");

class taskValidation {
  async addTaskValidation(data) {
    const schema = Joi.object({
      title: Joi.string().required(),
      due_date: Joi.string().required(),
      userDetails: Joi.object().required(),
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

module.exports = new taskValidation();
