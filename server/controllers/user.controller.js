const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const Sequelize = db.Sequelize;
const { paginate } = require("paginate-info");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// User profile update
exports.profile = async (req, res) => {
  if (req?.file?.filename) {
    req.body.profile_pic = req?.file?.filename;
  }

  try {
    await User.update(req.body, {
      where: { id: req.userId },
    });

    const user = await User.findByPk(req.userId);

    res.json({ user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { password, new_password } = req.body;

    // Retrieve the user from the database
    const user = await User.findOne({ where: { id: req.userId } });

    // Compare the provided password with the user's current password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid old password" });
    }

    // Encrypt the new password
    const encryptedPassword = await bcrypt.hash(new_password, 10);

    // Update the user's password
    const updatedUser = await User.update(
      { password: encryptedPassword },
      { where: { id: req.userId } }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete account
exports.deleteAccount = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.userId } });
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update status
exports.updateStatus = async (req, res) => {
  const { userId, status } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    user.status = status;
    await user.save();

    return res.json({ success: true });
  } catch (error) {
    console.error("Error updating status:", error);
    return res.json({ success: false, message: "Failed to update status" });
  }
};

// Fetch user list
exports.userList = async (req, res) => {
  const searchValue = req.query.search || "";
  const sortColumn = req.query.sort || "name";
  const sortDirection = req.query.direction || "asc";
  const page = req.query.page || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const { count, rows: users } = await User.findAndCountAll({
      where: {
        [Sequelize.Op.or]: [
          { name: { [Sequelize.Op.like]: `%${searchValue}%` } },
          { email: { [Sequelize.Op.like]: `%${searchValue}%` } },
        ],
      },
      order: [[sortColumn, sortDirection]],
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);
    const paginationInfo = { currentPage: page, totalPages };

    res.render("users", {
      users,
      paginationInfo,
      searchValue,
      sortColumn,
      sortDirection,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    const paginationInfo = { currentPage: 1, totalPages: 0 };

    res.render("users", {
      users: [],
      paginationInfo,
      searchValue: "",
      sortColumn: "name",
      sortDirection: "asc",
    });
  }
};

// Download CSV
exports.downloadCSV = async (req, res) => {
  try {
    const users = await User.findAll();

    const csvWriter = createCsvWriter({
      path: "user_list.csv",
      header: [
        { id: "id", title: "ID" },
        { id: "name", title: "Name" },
        { id: "email", title: "Email" },
        { id: "gender", title: "Gender" },
        { id: "phone", title: "Phone" },
        { id: "date", title: "Date" },
      ],
    });

    await csvWriter.writeRecords(users);

    // Redirect back to the user list page after downloading the CSV file
    res.redirect("/users");
  } catch (error) {
    console.error("Error generating CSV:", error);
    res.sendStatus(500);
  }
};
