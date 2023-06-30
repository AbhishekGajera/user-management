const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Email
  User.findOne({
    where: {
      email: req.body.email,
      soft_delete: { [Op.ne]: "deleted" },
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Email is already in use!",
      });
      return;
    }

    next();
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
