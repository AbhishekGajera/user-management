const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const { name, email, gender, phone, password } = req.body;

    // Encrypt the password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      gender,
      phone,
      password: encryptedPassword,
      status: "pending",
      date: new Date(),
      profile_pic: "sample_avatar.jpg",
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: 365 * 24 * 60 * 60, // 365 days in seconds
    });

    res.json({
      user: newUser,
      token,
      status: 200,
      message: "Successfully Registered",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 365 * 24 * 60 * 60, // 365 days in seconds
    });

    // Send token as response
    res.json({
      user,
      token,
      status: 200,
      message: "Successfully Logedin",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
