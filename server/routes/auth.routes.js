const { verifySignUp, validate } = require("../middleware");
const controller = require("../controllers/auth.controller");
const authValidation = require("../validations/auth.validation");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // User registration
  app.post(
    "/auth/register",
    [
      validate(authValidation.register),
      verifySignUp.checkDuplicateUsernameOrEmail,
    ],
    controller.signup
  );

  // User login
  app.post(
    "/auth/login",
    [validate(authValidation.login)],
    controller.signin
  );
  module.exports = app;
};
