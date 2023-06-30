const Joi = require("joi");
const { password } = require("./custom.validation");

const updateProfile = {
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string(),
    gender: Joi.string().valid("male", "female", "other"),
    phone: Joi.alternatives().try(
      Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/),
      Joi.number().integer().min(1000000000).max(9999999999)
    ),
    image: Joi.object({
      originalName: Joi.string().required(),
      path: Joi.string().required(),
      size: Joi.number().required(),
    }),
  }),
};

const updatePassword = {
  body: Joi.object().keys({
    password: Joi.string().custom(password).required(),
    new_password: Joi.string().custom(password).required(),
  }),
};

module.exports = {
  updateProfile,
  updatePassword
};
