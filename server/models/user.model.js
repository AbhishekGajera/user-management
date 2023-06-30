// models/user.js
const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: true,
      values: ["pending", "active", "de-active"],
      defaultValue: "pending",
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    profile_pic: {
      type: DataTypes.STRING,
      defaultValue: "avatar.jpeg",
    },
    soft_delete: {
      type: DataTypes.ENUM,
      allowNull: true,
      values: ["not_deleted", "deleted"],
      defaultValue: "not_deleted",
    },
  });
  return User;
};
