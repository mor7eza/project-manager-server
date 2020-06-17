const joi = require("@hapi/joi");

module.exports.createUserValidator = joi
  .object({
    fullName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required()
  })
  .options({ abortEarly: false });
