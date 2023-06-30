const Joi = require("joi");
const { password } = require("./custom.validation");

const register = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().custom(password).required(),
    name: Joi.string().required(),
    gender: Joi.string().valid("male", "female", "other").required(),
    phone: Joi.alternatives()
      .try(
        Joi.string()
          .length(10)
          .pattern(/^[0-9]+$/),
        Joi.number().integer().min(1000000000).max(9999999999)
      )
      .required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
};
