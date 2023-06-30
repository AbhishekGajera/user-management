const { authJwt, validate } = require("../middleware");
const controller = require("../controllers/user.controller");
const userValidation = require("../validations/user.validation");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // User profile update
  app.patch(
    "/user/update-profile",
    [validate(userValidation?.updateProfile), authJwt.verifyToken],
    controller.profile
  );

  // Change password
  app.patch(
    "/user/change-password",
    [validate(userValidation?.updatePassword), authJwt.verifyToken],
    controller.changePassword
  );

  // Delete account
  app.delete(
    "/user/delete-account",
    [authJwt.verifyToken],
    controller.deleteAccount
  );

  // Fetch user list
  app.get("/users", controller.userList);

  // Update status
  app.post("/users/update-status", controller.updateStatus);

  // Fetch user list
  app.get("/users/download-csv", controller.downloadCSV);

  module.exports = app;
};
